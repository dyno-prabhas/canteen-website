import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signInUser, getUserProfile } from "@/lib/supabase"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        try {
          // Use our helper function to sign in the user
          const { user } = await signInUser(credentials.email, credentials.password)

          if (!user) {
            throw new Error("Invalid email or password")
          }

          // Get the user profile for additional information
          const profile = await getUserProfile(user.id)

          return {
            id: user.id,
            email: user.email,
            name: profile?.full_name || user.user_metadata?.full_name || null,
          }
        } catch (error: any) {
          console.error("Authentication error:", error.message)

          // Handle specific Supabase errors
          if (error.message?.includes("Invalid login credentials")) {
            throw new Error("Invalid email or password")
          } else if (error.message?.includes("Invalid Supabase configuration")) {
            throw new Error("Authentication service unavailable")
          } else {
            throw new Error(error.message || "Authentication failed")
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = (token.name as string) || null
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
