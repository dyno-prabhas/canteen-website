import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CategoryPage from "@/components/menu/category-page"

export default function MenuPage() {
  return (
    <>
      <CategoryPage
        category="all"
        title="Our Menu"
        description="Browse our complete selection of delicious food and beverages"
      />

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
    </>
  )
}
