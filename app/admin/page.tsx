"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, DollarSign, TrendingUp, Users, Calendar, ArrowRight, BarChart3, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"

// Mock data for the dashboard
const mockStats = {
  totalOrders: 1248,
  todaySales: 42,
  totalRevenue: 24780,
  totalUsers: 842,
  popularItems: [
    { name: "Chicken Sandwich", count: 156 },
    { name: "Vegetable Pasta", count: 129 },
    { name: "Fruit Smoothie", count: 98 },
    { name: "Chocolate Muffin", count: 87 },
    { name: "Caesar Salad", count: 76 },
  ],
  recentOrders: [
    { id: "ORD-001", user: "John Doe", items: 3, total: 18.97, status: "completed", time: "2 hours ago" },
    { id: "ORD-002", user: "Jane Smith", items: 2, total: 12.49, status: "processing", time: "3 hours ago" },
    { id: "ORD-003", user: "Mike Johnson", items: 4, total: 24.96, status: "completed", time: "5 hours ago" },
    { id: "ORD-004", user: "Sarah Williams", items: 1, total: 7.99, status: "pending", time: "6 hours ago" },
  ],
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("today")

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "processing":
        return "text-blue-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("today")}
            className={timeframe === "today" ? "bg-orange-100 text-orange-600 border-orange-200" : ""}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("week")}
            className={timeframe === "week" ? "bg-orange-100 text-orange-600 border-orange-200" : ""}
          >
            This Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("month")}
            className={timeframe === "month" ? "bg-orange-100 text-orange-600 border-orange-200" : ""}
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Sales</p>
                <h3 className="text-2xl font-bold mt-1">{stats.todaySales}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>8% increase</span>
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalRevenue)}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>15% increase</span>
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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalUsers}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>5% increase</span>
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales Overview</TabsTrigger>
          <TabsTrigger value="popular">Popular Items</TabsTrigger>
          <TabsTrigger value="recent">Recent Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>View your sales performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Sales chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Items</CardTitle>
                <CardDescription>Top selling items by order count</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {stats.popularItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-3">
                          {index + 1}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.count} orders</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-orange-500 hover:text-orange-600">
                  View All Items <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Orders by category</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Category chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium">Customer</th>
                      <th className="text-left py-3 px-2 font-medium">Items</th>
                      <th className="text-left py-3 px-2 font-medium">Total</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2">{order.id}</td>
                        <td className="py-3 px-2">{order.user}</td>
                        <td className="py-3 px-2">{order.items} items</td>
                        <td className="py-3 px-2">{formatCurrency(order.total)}</td>
                        <td className="py-3 px-2">
                          <span className={`capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                        </td>
                        <td className="py-3 px-2 text-gray-500">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-orange-500 hover:text-orange-600">
                View All Orders <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
