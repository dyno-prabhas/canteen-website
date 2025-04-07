import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "Breakfast Combo",
      description: "Get a coffee and breakfast sandwich for just $6.99",
      discount: "30% OFF",
      image: "/placeholder.svg?height=400&width=600",
      validUntil: "2023-12-31",
      code: "BREAKFAST30",
    },
    {
      id: 2,
      title: "Lunch Special",
      description: "Any sandwich, chips, and drink for $8.99",
      discount: "20% OFF",
      image: "/placeholder.svg?height=400&width=600",
      validUntil: "2023-12-31",
      code: "LUNCH20",
    },
    {
      id: 3,
      title: "Student Discount",
      description: "Show your student ID and get 15% off your order",
      discount: "15% OFF",
      image: "/placeholder.svg?height=400&width=600",
      validUntil: "2023-12-31",
      code: "STUDENT15",
    },
    {
      id: 4,
      title: "Happy Hour",
      description: "All beverages half price from 3PM to 5PM",
      discount: "50% OFF",
      image: "/placeholder.svg?height=400&width=600",
      validUntil: "2023-12-31",
      code: "HAPPYHOUR",
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Special Offers</h1>
            <p className="text-gray-600 dark:text-gray-400">Check out our latest deals and promotions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 md:h-64">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">{offer.discount}</Badge>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{offer.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{offer.description}</p>
                  <div className="flex flex-col space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Tag className="h-4 w-4 mr-2" />
                      <span>
                        Use code: <span className="font-semibold">{offer.code}</span>
                      </span>
                    </div>
                  </div>
                  <Link href="/menu">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Order Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-orange-50 dark:bg-orange-950/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Loyalty Program</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Sign up for our loyalty program and earn points with every purchase. Redeem your points for free food and
              exclusive offers.
            </p>
            <Link href="/loyalty">
              <Button className="bg-orange-500 hover:bg-orange-600">Learn More</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

