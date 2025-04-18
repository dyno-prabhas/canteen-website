// import { NextResponse } from "next/server"
// import Stripe from "stripe"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/pages/api/auth/[...nextauth]"

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// //   apiVersion: "2023-10-16",
// // })

// export async function POST(request: Request) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { amount, metadata } = await request.json()

//     if (!amount || amount <= 0) {
//       return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Convert to cents
//       currency: "usd",
//       metadata: {
//         userId: session.user.id,
//         ...metadata,
//       },
//     })

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//     })
//   } catch (error) {
//     console.error("Error creating payment intent:", error)
//     return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
//   }
// }
