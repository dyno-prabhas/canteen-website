import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(name, slug),
        tags:product_tags(tag:tags(name)),
        allergens:product_allergens(allergen:allergens(name)),
        nutritional_info(*),
        reviews(id, rating, comment, created_at, user:user_profiles(full_name))
      `)
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Transform the data to a more usable format
    const transformedData = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image_url,
      category: data.category?.name || "",
      categorySlug: data.category?.slug || "",
      rating: data.rating,
      reviews_count: data.reviews_count,
      is_available: data.is_available,
      preparation_time: data.preparation_time,
      tags: data.tags?.map((t: any) => t.tag.name) || [],
      allergens: data.allergens?.map((a: any) => a.allergen.name) || [],
      nutritionalInfo: data.nutritional_info || null,
      reviews: data.reviews || [],
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
