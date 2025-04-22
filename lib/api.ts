// Utility functions for API calls

export async function fetchCategories() {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching categories:", error)
      return []
    }
  }
  
  export async function fetchProducts(options?: {
    category?: string
    tag?: string
    search?: string
  }) {
    try {
      let url = "/api/products"
      const params = new URLSearchParams()
  
      if (options?.category) {
        params.append("category", options.category)
      }
  
      if (options?.tag) {
        params.append("tag", options.tag)
      }
  
      if (options?.search) {
        params.append("search", options.search)
      }
  
      if (params.toString()) {
        url += `?${params.toString()}`
      }
  
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }
  
  export async function fetchProductById(id: string | number) {
    try {
      console.log("Fetching product with ID:", id)
      const response = await fetch(`/api/products/${id}`)
  
      if (!response.ok) {
        console.error("Error response:", response.status, response.statusText)
        throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
      }
  
      const data = await response.json()
      console.log("Product data received:", data)
      return data
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      return null
    }
  }

  export async function updateProfile(id: string, profile: any) {
    try {
      const response = await fetch(`/api/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })
      if (!response.ok) {
        throw new Error("Failed to update profile")
      }
      return await response.json()
    } catch (error) {
      console.error("Error updating profile:", error)
      return null
    }
  }


