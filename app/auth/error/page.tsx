"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      switch (errorParam) {
        case "Configuration":
          setError("There is a problem with the server configuration.")
          break
        case "AccessDenied":
          setError("You do not have access to sign in.")
          break
        case "Verification":
          setError("The verification token has expired or has already been used.")
          break
        default:
          setError("An error occurred during authentication.")
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>

        {error ? (
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            An unexpected error occurred during the authentication process.
          </p>
        )}

        <div className="flex flex-col space-y-4">
          <Link href="/auth/signin">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Try Again</Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

