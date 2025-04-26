import type { ReactNode } from "react"
import AdminLayout from "@/components/layout/admin-layout"

export const metadata = {
  title: "Admin Dashboard - Campus Canteen",
  description: "Admin dashboard for Campus Canteen",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
