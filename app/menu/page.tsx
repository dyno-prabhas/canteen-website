import Image from "next/image"
import { Filter } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuItemCard from "@/components/menu/menu-item-card"

// Sample menu data - in a real app, this would come from an API
const categories = [
  { id: "all", name: "All Items" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "snacks", name: "Snacks" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
]

const menuItems = [
  {
    id: 1,
    name: "Chicken Sandwich",
    description: "Grilled chicken with fresh vegetables and special sauce",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "lunch",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Vegetable Pasta",
    description: "Fresh pasta with seasonal vegetables and pesto sauce",
    price: 6.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "lunch",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Fruit Smoothie",
    description: "Blend of fresh fruits with yogurt and honey",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "beverages",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Chocolate Muffin",
    description: "Freshly baked chocolate muffin with chocolate chips",
    price: 2.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "desserts",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Breakfast Burrito",
    description: "Scrambled eggs, cheese, and vegetables wrapped in a tortilla",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "breakfast",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 5.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "lunch",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Potato Chips",
    description: "Crispy potato chips with a sprinkle of salt",
    price: 1.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "snacks",
    rating: 4.3,
  },
  {
    id: 8,
    name: "Hot Coffee",
    description: "Freshly brewed coffee with your choice of milk and sugar",
    price: 2.29,
    image: "/placeholder.svg?height=300&width=300",
    category: "beverages",
    rating: 4.8,
  },
  {
    id: 9,
    name: "Pancake Stack",
    description: "Fluffy pancakes served with maple syrup and butter",
    price: 4.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "breakfast",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with walnuts",
    price: 3.29,
    image: "/placeholder.svg?height=300&width=300",
    category: "desserts",
    rating: 4.9,
  },
  {
    id: 11,
    name: "Iced Tea",
    description: "Refreshing iced tea with lemon",
    price: 1.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "beverages",
    rating: 4.5,
  },
  {
    id: 12,
    name: "Granola Bar",
    description: "Healthy granola bar with nuts and dried fruits",
    price: 2.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "snacks",
    rating: 4.2,
  },
]

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
            <p className="text-gray-600 dark:text-gray-400">Browse our selection of delicious food and beverages</p>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <TabsList className="overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <div className="flex border rounded-md">
                  <Button variant="ghost" size="sm" className="rounded-r-none border-r">
                    Price: Low to High
                  </Button>
                </div>
              </div>
            </div>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter((item) => category.id === "all" || item.category === category.id)
                    .map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Daily Specials Section */}
          <section className="mt-16">
            <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Daily Specials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Today's Special"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      20% OFF
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">Combo Meal Deal</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Get a sandwich, side, and drink for a special price. Available Monday-Friday.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-500 line-through mr-2">$12.99</span>
                        <span className="font-bold text-orange-500">$9.99</span>
                      </div>
                      <Button className="bg-orange-500 hover:bg-orange-600">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Chef's Special"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      NEW
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">Chef's Special Pasta</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Our chef's special pasta with seasonal ingredients. Limited availability.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-500">$8.99</span>
                      <Button className="bg-orange-500 hover:bg-orange-600">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

