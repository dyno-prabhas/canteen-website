import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"


// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

// Create client with validation
const createSupabaseClient = () => {
  if (!isValidUrl(supabaseUrl)) {
    console.error("Invalid Supabase URL. Please check your environment variables.")

    // In development, return a mock client that won't throw errors
    if (process.env.NODE_ENV === "development") {
      return {
        auth: {
          signUp: async () => ({ data: null, error: new Error("Invalid Supabase configuration") }),
          signInWithPassword: async () => ({ data: null, error: new Error("Invalid Supabase configuration") }),
          signOut: async () => ({ error: null }),
          getUser: async () => ({ data: { user: null }, error: null }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: null }),
            }),
            insert: async () => ({ data: null, error: null }),
          }),
        }),
      } as any
    }
  }

  // Create the actual client if URL is valid
  return createClient<Database>(supabaseUrl, supabaseKey)
}

export const supabase = createSupabaseClient()

// Helper function to create a new user
export async function createUser(email: string, password: string, fullName: string) {
  try {
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      throw authError
    }

    // If auth user creation was successful, create the user profile
    if (authData?.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: authData.user.id,
          full_name: fullName,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (profileError) {
        // If profile creation fails, we should ideally clean up the auth user
        // but for simplicity, we'll just throw the error
        throw profileError
      }

      return profileData
    }

    return authData.user
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Helper function to sign in a user
export async function signInUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error signing in user:", error)
    throw error
  }
}

// Helper function to sign out a user
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error("Error signing out user:", error)
    throw error
  }
}

// Helper function to get the current user
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return null
    }

    return data.user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

    if (error) {
      return null
    }

    return data
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

export async function updateUserProfile(userId: string, profile: any) {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .update(profile)
      .eq("id", userId)
      .select()
      .single()

      //console.log("data", data)
    if (error) {
      throw error
    }
    return data
  } catch (error) {
    //console.error("Error updating user profile:", error)
    throw error
  }
}

