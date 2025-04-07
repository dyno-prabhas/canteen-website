"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import Search from "./Search"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Canteen
          </Link>
          <Search />
          <div className="flex items-center">
            <Link href="/products" className="text-gray-800 hover:text-gray-600 mx-4">
              Products
            </Link>
            {session ? (
              <>
                <Link href="/cart" className="text-gray-800 hover:text-gray-600 mx-4">
                  Cart
                </Link>
                <Link href="/orders" className="text-gray-800 hover:text-gray-600 mx-4">
                  Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

