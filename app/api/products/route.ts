import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")

    let query = supabase.from("products").select(`
        *,
        category:categories(name, slug),
        tags:product_tags(tag:tags(name)),
        allergens:product_allergens(allergen:allergens(name)),
        nutritional_info(*)
      `)

    if (category) {
      // If category is a slug, we need to join with categories
      if (isNaN(Number.parseInt(category))) {
        query = query.eq("category.slug", category)
      } else {
        query = query.eq("category_id", Number.parseInt(category))
      }
    }

    if (tag) {
      query = query.contains("tags.tag.name", [tag])
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform the data to a more usable format
    const transformedData = data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image_url,
      category: product.category?.name || "",
      categorySlug: product.category?.slug || "",
      rating: product.rating,
      reviews_count: product.reviews_count,
      is_available: product.is_available,
      preparation_time: product.preparation_time,
      tags: product.tags?.map((t: any) => t.tag.name) || [],
      allergens: product.allergens?.map((a: any) => a.allergen.name) || [],
      nutritionalInfo: product.nutritional_info || null,
    }))

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
