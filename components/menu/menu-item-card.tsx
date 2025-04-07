"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
}

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        category: item.category,
      })

      toast("Added to cart", {
        description: `${item.name} has been added to your cart`,
      })

      setIsAdding(false)
    }, 300)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
      <Link href={`/menu/item/${item.id}`}>
        <div className="relative h-48">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill style={{ objectFit: "cover" }} />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/menu/item/${item.id}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className="flex items-center text-yellow-500">
              <Star className="fill-yellow-500 h-4 w-4 mr-1" />
              <span className="text-sm">{item.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
        </Link>
        <div className="flex justify-between items-center">
          <span className="font-bold text-orange-500">${item.price.toFixed(2)}</span>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

