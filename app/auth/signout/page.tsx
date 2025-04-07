"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignOut() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ callbackUrl: "/" })
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
            <LogOut className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to sign out of your account?</p>

        <div className="flex flex-col space-y-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? "Signing out..." : "Yes, Sign Out"}
          </Button>

          <Button variant="outline" className="w-full" onClick={handleCancel} disabled={isSigningOut}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

