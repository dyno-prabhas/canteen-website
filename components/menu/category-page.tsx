import Link from "next/link"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories, menuItems } from "@/app/menu/menu-data"
import MenuItemCard from "@/components/menu/menu-item-card"
import SuggestMeDialog from "@/components/menu/suggest-me-dialog"

interface CategoryPageProps {
  category: string
  title: string
  description?: string
}

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  // Filter menu items by category
  const filteredItems = category === "all" ? menuItems : menuItems.filter((item) => item.category === category)

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
            Filter
          </Button>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
