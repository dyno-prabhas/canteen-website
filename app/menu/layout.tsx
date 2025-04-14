import type { ReactNode } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      <Footer />
    </>
  )
}
