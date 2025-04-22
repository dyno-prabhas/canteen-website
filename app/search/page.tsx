"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams?.get("q") || ""
  const { addItem } = useCart()
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function searchProducts() {
      if (query) {
        setLoading(true)
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('name')

          if (error) {
            throw error
          }

          setResults(data || [])
        } catch (error) {
          console.error('Error searching products:', error)
          toast.error('Failed to search products')
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
        setLoading(false)
      }
    }

    searchProducts()
  }, [query])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    })

    toast("Added to cart", {
      description: `${product.name} added to your cart`,
    })
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {loading ? "Searching..." : `Found ${results.length} results for "${query}"`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-3 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <Link href={`/menu/item/${product.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/menu/item/${product.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="fill-yellow-500 h-4 w-4 mr-1" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    </Link>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-500">${product.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find any items matching your search.</p>
              <Link href="/menu">
                <Button className="bg-orange-500 hover:bg-orange-600">Browse Menu</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

