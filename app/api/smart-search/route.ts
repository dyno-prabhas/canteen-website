import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  try {
    // Use AI to understand the user's query and generate relevant search terms
    const { text: enhancedQuery } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Given the search query "${query}" for a canteen website, generate a comma-separated list of relevant search terms, including synonyms and related concepts.`,
    })

    const searchTerms = enhancedQuery.split(",").map((term) => term.trim())

    // Perform a fuzzy search using the enhanced search terms
    const { data: results, error } = await supabase
      .from("products")
      .select("*")
      .textSearch("name", searchTerms.join(" | "))
      .order("name")

    if (error) {
      throw error
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error performing smart search:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
