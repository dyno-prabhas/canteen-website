"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function ClientRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const { data: session, status } = useSession()

  useEffect(() => {
    // Only fetch recommendations if the user is authenticated
    if (status === "authenticated" && session?.user?.id) {
      // In a real app, you would fetch from an API
      // For now, we'll just simulate it
      setRecommendations(["Chicken Sandwich", "Fruit Smoothie", "Caesar Salad"])
    }
  }, [session, status])

  // Don't render anything if not authenticated or no recommendations
  if (status !== "authenticated" || recommendations.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
        <ul className="list-disc list-inside">
          {recommendations.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

