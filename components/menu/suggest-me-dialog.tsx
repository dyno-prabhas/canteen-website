"use client"

import { useState, useEffect } from "react"
import { Clock, Cloud, Sun, Droplets, Snowflake } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { getWeatherCategory } from "@/utils/getWeatherCategory"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  tags?: string[]
}

interface SuggestMeDialogProps {
  menuItems: MenuItem[]
}

export default function SuggestMeDialog({ menuItems }: SuggestMeDialogProps) {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [currentWeather, setCurrentWeather] = useState<string>("sunny")
  const [suggestions, setSuggestions] = useState<MenuItem[]>([])
  const [selectedFactor, setSelectedFactor] = useState<"time" | "weather">("time")

  // Get current time
  useEffect(() => {
    const now = new Date()
    const hours = now.getHours()
    let timeOfDay = ""

    if (hours >= 6 && hours < 11) {
      timeOfDay = "morning"
    } else if (hours >= 11 && hours < 15) {
      timeOfDay = "lunch"
    } else if (hours >= 15 && hours < 18) {
      timeOfDay = "afternoon"
    } else if (hours >= 18 && hours < 22) {
      timeOfDay = "evening"
    } else {
      timeOfDay = "night"
    }

    setCurrentTime(timeOfDay)
  }, [])

  // In a real app, you would fetch the weather from an API
  // For now, we'll just simulate it with a random selection
  useEffect(() => {
    const fetchWeather = async() => {
      try {
          const category = await getWeatherCategory();
          // const weather = category?.toString;
          setCurrentWeather(category)
      } catch (err) {
          console.log(err); 
      }
    };
    fetchWeather();
  }, [])

  // Generate suggestions based on time and weather
  useEffect(() => {
    if (selectedFactor === "time") {
      generateTimeBasedSuggestions()
    } else {
      generateWeatherBasedSuggestions()
    }
  }, [selectedFactor, currentTime, currentWeather])

  const generateTimeBasedSuggestions = () => {
    let suggestedItems: MenuItem[] = []

    switch (currentTime) {
      case "morning":
        // Breakfast items
        suggestedItems = menuItems.filter(
          (item) =>
            item.category === "breakfast" ||
            (item.tags && (item.tags.includes("morning") || item.tags.includes("light"))),
        )
        break
      case "lunch":
        // Lunch items
        suggestedItems = menuItems.filter(
          (item) => item.category === "lunch" || (item.tags && item.tags.includes("filling")),
        )
        break
      case "afternoon":
        // Snack items
        suggestedItems = menuItems.filter(
          (item) =>
            item.category === "snacks" || item.category === "beverages" || (item.tags && item.tags.includes("light")),
        )
        break
      case "evening":
        // Dinner items
        suggestedItems = menuItems.filter(
          (item) => item.category === "lunch" || (item.tags && item.tags.includes("dinner")),
        )
        break
      case "night":
        // Light items for night
        suggestedItems = menuItems.filter(
          (item) =>
            (item.tags && item.tags.includes("light")) || item.category === "beverages" || item.category === "desserts",
        )
        break
      default:
        suggestedItems = menuItems
    }

    // If no specific suggestions, provide some default ones
    if (suggestedItems.length < 2) {
      // Get random items as fallback
      suggestedItems = [...menuItems].sort(() => 0.5 - Math.random()).slice(0, 3)
    } else if (suggestedItems.length > 3) {
      // Limit to 3 items
      suggestedItems = suggestedItems.slice(0, 3)
    }

    setSuggestions(suggestedItems)
  }

  const generateWeatherBasedSuggestions = () => {
    let suggestedItems: MenuItem[] = []

    switch (currentWeather) {
      case "hot":
        // Cold and refreshing items for hot weather
        suggestedItems = menuItems.filter(
          (item) =>
            item.category === "beverages" ||
            (item.tags && (item.tags.includes("cold") || item.tags.includes("refreshing"))),
        )
        break
      case "cold":
        // Warm and comforting items for cold weather
        suggestedItems = menuItems.filter(
          (item) =>
            (item.tags && (item.tags.includes("warm") || item.tags.includes("hot"))) ||
            item.name.toLowerCase().includes("soup") ||
            item.name.toLowerCase().includes("coffee") ||
            item.name.toLowerCase().includes("tea"),
        )
        break
      case "rainy":
        // Comfort food for rainy weather
        suggestedItems = menuItems.filter(
          (item) =>
            (item.tags && item.tags.includes("comfort")) ||
            item.name.toLowerCase().includes("soup") ||
            item.name.toLowerCase().includes("hot"),
        )
        break
      case "sunny":
        // Light and refreshing items for sunny weather
        suggestedItems = menuItems.filter(
          (item) =>
            (item.tags && (item.tags.includes("light") || item.tags.includes("refreshing"))) ||
            item.category === "beverages" ||
            item.category === "salads",
        )
        break
      default:
        suggestedItems = menuItems
    }

    // If no specific suggestions, provide some default ones
    if (suggestedItems.length < 2) {
      // Get random items as fallback
      suggestedItems = [...menuItems].sort(() => 0.5 - Math.random()).slice(0, 3)
    } else if (suggestedItems.length > 3) {
      // Limit to 3 items
      suggestedItems = suggestedItems.slice(0, 3)
    }

    setSuggestions(suggestedItems)
  }

  const getTimeIcon = () => {
    switch (currentTime) {
      case "morning":
        return <Sun className="h-5 w-5 text-orange-500" />
      case "lunch":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "afternoon":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "evening":
        return <Clock className="h-5 w-5 text-indigo-500" />
      case "night":
        return <Clock className="h-5 w-5 text-blue-800" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getWeatherIcon = () => {
    switch (currentWeather) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "rainy":
        return <Droplets className="h-5 w-5 text-blue-500" />
      case "cold":
        return <Snowflake className="h-5 w-5 text-blue-300" />
      case "hot":
        return <Sun className="h-5 w-5 text-red-500" />
      default:
        return <Cloud className="h-5 w-5" />
    }
  }

  const getTimeText = () => {
    switch (currentTime) {
      case "morning":
        return "Good morning! Here are some breakfast options:"
      case "lunch":
        return "It's lunch time! How about these options:"
      case "afternoon":
        return "Need an afternoon pick-me-up? Try these:"
      case "evening":
        return "Good evening! Here are some dinner suggestions:"
      case "night":
        return "Late night cravings? These might satisfy:"
      default:
        return "Here are some suggestions for you:"
    }
  }

  const getWeatherText = () => {
    switch (currentWeather) {
      case "sunny":
        return "It's sunny outside! Here are some refreshing options:"
      case "rainy":
        return "Rainy day? These comfort foods are perfect:"
      case "cold":
        return "Feeling cold? Warm up with these options:"
      case "hot":
        return "Beat the heat with these refreshing choices:"
      default:
        return "Here are some suggestions based on the weather:"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Clock className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Suggest Me</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg sm:text-xl">Food Suggestions</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Personalized recommendations based on time and weather
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="time" onValueChange={(value) => setSelectedFactor(value as "time" | "weather")}>
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="time" className="flex items-center py-2 px-3">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-xs sm:text-sm">Based on Time</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center py-2 px-3">
              <Cloud className="h-4 w-4 mr-2" />
              <span className="text-xs sm:text-sm">Based on Weather</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="time" className="mt-4">
            <div className="flex items-center mb-4">
              {getTimeIcon()}
              <span className="ml-2 font-medium text-sm sm:text-base">{getTimeText()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {suggestions.map((item) => (
                <Link key={item.id} href={`/menu/item/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className="relative h-24 sm:h-32">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardContent className="p-2 sm:p-3">
                      <h3 className="font-medium text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      <p className="font-bold text-orange-500 mt-1 text-xs sm:text-sm">${item.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weather" className="mt-4">
            <div className="flex items-center mb-4">
              {getWeatherIcon()}
              <span className="ml-2 font-medium text-sm sm:text-base">{getWeatherText()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {suggestions.map((item) => (
                <Link key={item.id} href={`/menu/item/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className="relative h-24 sm:h-32">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardContent className="p-2 sm:p-3">
                      <h3 className="font-medium text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      <p className="font-bold text-orange-500 mt-1 text-xs sm:text-sm">${item.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

