"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function ClientHome() {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetch(`/api/recommendations?userId=${session.user.id}`)
        .then((response) => response.json())
        .then((data) => setRecommendations(data.recommendations))
    }
  }, [session, status])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <>
      {recommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
          <ul className="list-disc list-inside">
            {recommendations.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

