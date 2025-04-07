"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/app/components/Header"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
  }, [id])

  const addToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const existingItem = cart.find((item: any) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }

      localStorage.setItem("cart", JSON.stringify(cart))
      alert("Product added to cart!")
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-8"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={addToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

