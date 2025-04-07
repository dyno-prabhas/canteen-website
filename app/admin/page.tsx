"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  Calendar,
  List,
  Grid,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/admin")
    }

    if (status === "authenticated") {
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="animate-pulse space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Search..." className="pl-10 w-full md:w-64" />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">Export Data</Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Orders</p>
                    <h3 className="text-2xl font-bold">1,248</h3>
                    <p className="text-green-600 text-sm flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>12% increase</span>
                    </p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                    <h3 className="text-2xl font-bold">$24,780</h3>
                    <p className="text-green-600 text-sm flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>8% increase</span>
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
                    <h3 className="text-2xl font-bold">842</h3>
                    <p className="text-green-600 text-sm flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>5% increase</span>
                    </p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Orders</p>
                    <h3 className="text-2xl font-bold">18</h3>
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span>3% decrease</span>
                    </p>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
                    <Package className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Sales Overview</span>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        This Month
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <BarChart className="h-16 w-16 text-gray-300" />
                      <p className="ml-4 text-gray-600 dark:text-gray-400">Sales chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Popular Categories</span>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        This Month
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <PieChart className="h-16 w-16 text-gray-300" />
                      <p className="ml-4 text-gray-600 dark:text-gray-400">Category chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Orders</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        className={viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-300" />
                    <p className="ml-4 text-gray-600 dark:text-gray-400">Orders will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Product Inventory</span>
                    <Button className="bg-orange-500 hover:bg-orange-600">Add Product</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-gray-300" />
                    <p className="ml-4 text-gray-600 dark:text-gray-400">Products will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center">
                    <Users className="h-16 w-16 text-gray-300" />
                    <p className="ml-4 text-gray-600 dark:text-gray-400">Customers will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-4">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">New customer registered</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Jane Smith created an account</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-4">
                    <ShoppingBag className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">New order placed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Order #1234 was placed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-full mr-4">
                    <Package className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium">Order status updated</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order #1233 changed from pending to delivered
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full mr-4">
                    <DollarSign className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Refund processed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Refund for order #1230 was processed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}

