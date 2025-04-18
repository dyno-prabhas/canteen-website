"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/app/menu/menu-data"
import MenuItemCard from "@/components/menu/menu-item-card"
import SuggestMeDialog from "@/components/menu/suggest-me-dialog"
import { fetchProducts } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  categorySlug: string
  rating: number
  tags: string[]
}

interface CategoryPageProps {
  category: string
  title: string
  description?: string
}

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        // If category is "all", don't filter by category
        const categoryParam = category === "all" ? undefined : category
        const products = await fetchProducts({ category: categoryParam })
        setMenuItems(products)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category])

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {description || `Browse our selection of delicious ${title.toLowerCase()}`}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.path}>
              <Button
                variant={cat.id === category ? "default" : "outline"}
                size="sm"
                className={cat.id === category ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {cat.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SuggestMeDialog menuItems={menuItems} />
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden border">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : menuItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">No items found in this category.</p>
        </div>
      )}
    </>
  )
}
