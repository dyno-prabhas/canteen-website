"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"



export default function OrderConfirmation() {
  const [status, setStatus] = useState<"success" | "error" | "loading">("loading")
  const searchParams = useSearchParams()

  useEffect(() => {
    const paymentIntent = searchParams?.get("payment_intent")
    const paymentIntentClientSecret = searchParams?.get("payment_intent_client_secret")

    if (paymentIntent && paymentIntentClientSecret) { 
      // Here you would typically verify the payment with your backend
      // and update the order status in your database
      setStatus("success")
    } else {
      setStatus("error")
    }
  }, [searchParams])

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        {status === "loading" && <p>Processing your order...</p>}
        {status === "success" && (
          <div>
            <p className="text-green-600 font-semibold">Your order has been successfully placed!</p>
            <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
          </div>
        )}
        {status === "error" && (
          <p className="text-red-600 font-semibold">
            There was an error processing your order. Please contact customer support.
          </p>
        )}
      </main>
    </div>
  )
}

