import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Coffee, Utensils, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import ClientRecommendations from "@/components/client-recommendations"

export default function Home() {
  // Featured categories
  const categories = [
    { name: "Breakfast", icon: Coffee, href: "/menu/breakfast" },
    { name: "Lunch", icon: Utensils, href: "/menu/lunch" },
    { name: "Snacks", icon: Coffee, href: "/menu/snacks" },
    { name: "Beverages", icon: Coffee, href: "/menu/beverages" },
  ]

  // Popular items
  const popularItems = [
    {
      id: 1,
      name: "Chicken Sandwich",
      description: "Grilled chicken with fresh vegetables and special sauce",
      price: 5.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Vegetable Pasta",
      description: "Fresh pasta with seasonal vegetables and pesto sauce",
      price: 6.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Fruit Smoothie",
      description: "Blend of fresh fruits with yogurt and honey",
      price: 3.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Chocolate Muffin",
      description: "Freshly baked chocolate muffin with chocolate chips",
      price: 2.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Delicious food"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="container mx-auto px-4 z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Delicious Food for Every Mood</h1>
              <p className="text-xl mb-8">Enjoy a wide variety of meals, snacks, and beverages at affordable prices.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/menu">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    View Menu
                  </Button>
                </Link>
                <Link href="/offers">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Special Offers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore our wide range of food and beverages categorized for your convenience.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link key={category.name} href={category.href}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                      <category.icon className="h-12 w-12 text-orange-500 mb-4" />
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations Section (Client Component) */}
        <ClientRecommendations />

        {/* Popular Items Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Popular Items</h2>
                <p className="text-gray-600 dark:text-gray-400">Most ordered items by our customers</p>
              </div>
              <Link href="/menu">
                <Button variant="ghost" className="text-orange-500 hover:text-orange-600">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularItems.map((item) => (
                <Link key={item.id} href={`/menu/item/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="fill-yellow-500 h-4 w-4 mr-1" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-orange-500">${item.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We pride ourselves on providing quality food and excellent service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-4 inline-flex mb-4">
                  <Utensils className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We use fresh ingredients and prepare food with care to ensure quality and taste.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-4 inline-flex mb-4">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Quick preparation and efficient service to save your valuable time.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-4 inline-flex mb-4">
                  <Star className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Value</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Affordable prices without compromising on portion size or quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Browse our menu and place your order now for a delicious meal experience.
            </p>
            <Link href="/menu">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                Order Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

