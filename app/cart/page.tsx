"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export default function CartPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const deliveryFee = items.length > 0 ? 2.99 : 0
  const total = subtotal + tax + deliveryFee

  const handleCheckout = async () => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/cart")
      return
    }

    setIsProcessing(true)

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: session?.user?.id,
          total_amount: total,
          status: 'pending',
          payment_status: 'pending',
          payment_method: 'card',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()


      if (orderError) {
        toast.error("Error inserting order:", orderError.message)
        throw orderError
      }


      const order_id = order.id

      console.log("Order ID:", order_id)

      // Create order items for each cart item
      const orderItems = items.map(item => ({
        order_id: order_id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        created_at: new Date().toISOString()
      }))

      console.log("Order Items:", orderItems)

      // Insert all order items in a single transaction
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      console.log("Items Error:", itemsError)

      if (itemsError) {
        toast.error("Error inserting order items:", itemsError.message)
        throw itemsError
      }

      clearCart()
      toast.success("Order placed successfully!", {
        description: "Your order has been placed and will be delivered soon.",
      })
      router.push("/orders")
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link href="/menu">
                <Button className="bg-orange-500 hover:bg-orange-600">Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>

                          <div className="ml-4 flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-3 font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="ml-6 text-right">
                            <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Link href="/menu">
                        <Button variant="outline">Continue Shopping</Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => clearCart()}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
                      onClick={handleCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Checkout"}
                      {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

