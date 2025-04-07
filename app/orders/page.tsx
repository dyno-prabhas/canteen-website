"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Clock, Package, CheckCircle, XCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: number
  date: string
  status: "pending" | "processing" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/orders")
    }

    if (status === "authenticated") {
      // Simulate API call
      setTimeout(() => {
        setOrders([
          {
            id: 1001,
            date: "2023-06-15T14:30:00Z",
            status: "delivered",
            total: 18.97,
            items: [
              { id: 1, name: "Chicken Sandwich", price: 5.99, quantity: 2 },
              { id: 3, name: "Fruit Smoothie", price: 3.99, quantity: 1 },
              { id: 7, name: "Potato Chips", price: 1.99, quantity: 1 },
            ],
          },
          {
            id: 1002,
            date: "2023-06-10T12:15:00Z",
            status: "delivered",
            total: 14.47,
            items: [
              { id: 2, name: "Vegetable Pasta", price: 6.49, quantity: 1 },
              { id: 8, name: "Hot Coffee", price: 2.29, quantity: 2 },
              { id: 4, name: "Chocolate Muffin", price: 2.49, quantity: 1 },
            ],
          },
          {
            id: 1003,
            date: new Date().toISOString(),
            status: "processing",
            total: 12.97,
            items: [
              { id: 6, name: "Caesar Salad", price: 5.49, quantity: 1 },
              { id: 3, name: "Fruit Smoothie", price: 3.99, quantity: 1 },
              { id: 4, name: "Chocolate Muffin", price: 2.49, quantity: 1 },
            ],
          },
        ])
        setLoading(false)
      }, 1000)
    }
  }, [status, router])

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "processing":
        return "Processing"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
    }
  }

  if (status === "loading" || loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
            <div className="animate-pulse space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (status === "unauthenticated") {
    return null // Redirecting in useEffect
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Package className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet.</p>
              <Link href="/menu">
                <Button className="bg-orange-500 hover:bg-orange-600">Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                          <Badge className={`ml-3 ${getStatusColor(order.status)}`}>
                            <span className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{getStatusText(order.status)}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Placed on {new Date(order.date).toLocaleDateString()} at{" "}
                          {new Date(order.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
                      <h4 className="font-medium mb-2">Items</h4>
                      <ul className="space-y-2">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity} x {item.name}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" className="flex items-center">
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

