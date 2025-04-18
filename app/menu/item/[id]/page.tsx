"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Star, Minus, Plus, Heart, Share2, ArrowLeft, Clock, ShoppingBag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { fetchProductById } from "@/lib/api"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews_count: number
  preparation_time: string
  tags: string[]
  allergens: string[]
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  } | null
  reviews: Array<{
    id: number
    rating: number
    comment: string
    created_at: string
    user: {
      full_name: string
    }
  }>
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        // Make sure we're using the correct ID format
        const productId = params.id as string
        console.log("Loading product with ID:", productId)

        const data = await fetchProductById(productId)

        if (data) {
          console.log("Product loaded successfully:", data)
          setProduct(data)
        } else {
          console.error("Product not found or returned null")
          setError("Product not found")
        }
      } catch (error) {
        console.error("Error loading product:", error)
        setError("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        category: product.category,
      })

      toast("Added to cart", {
        description: `${quantity} x ${product.name} added to your cart`,
      })
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    const title = isFavorite ? "Removed from favorites" : "Added to favorites";
    toast(title, {
      description: isFavorite
        ? `${product?.name} has been removed from your favorites`
        : `${product?.name} has been added to your favorites`,
    })
  }

  const handleShare = () => {
    // In a real app, implement sharing functionality
    toast("Share", {
      description: "Sharing functionality would be implemented here",
    })
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-full md:w-1/2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              {error ? (
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
              ) : (
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
              )}
              <h1 className="text-2xl font-bold mb-4">{error ? "Error Loading Product" : "Product Not Found"}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error || "The product you're looking for doesn't exist or has been removed."}
              </p>
              <Button onClick={() => router.push("/menu")}>Back to Menu</Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-6 pl-0" onClick={() => router.push("/menu")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500 mr-4">
                  <Star className="fill-yellow-500 h-5 w-5 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">({product.reviews_count} reviews)</span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">Preparation time: {product.preparation_time}</span>
              </div>

              <div className="text-2xl font-bold text-orange-500 mb-6">${product.price.toFixed(2)}</div>

              <div className="flex items-center mb-6">
                <Button variant="outline" size="icon" onClick={decreaseQuantity}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 font-medium text-lg">{quantity}</span>
                <Button variant="outline" size="icon" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFavorite}
                  className={isFavorite ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {product.allergens && product.allergens.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.allergens.map((allergen) => (
                    <Badge key={allergen} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags && product.tags.length > 0 ? (
                        product.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No tags available</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Allergens</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens && product.allergens.length > 0 ? (
                        product.allergens.map((allergen) => (
                          <span key={allergen} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                            {allergen}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No allergens listed</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
                {product.nutritionalInfo ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{product.nutritionalInfo.calories}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{product.nutritionalInfo.protein}g</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{product.nutritionalInfo.carbs}g</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{product.nutritionalInfo.fat}g</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{product.nutritionalInfo.fiber}g</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fiber</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Nutritional information not available</p>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <div className="font-medium">{review.user?.full_name || "Anonymous"}</div>
                              <div className="flex items-center ml-2 text-yellow-500">
                                <Star className="fill-yellow-500 h-4 w-4" />
                                <span className="ml-1">{review.rating}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No reviews yet</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">Be the first to review</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
