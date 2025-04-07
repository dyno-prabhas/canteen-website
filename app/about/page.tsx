import Image from "next/image"
import { Coffee, Users, Clock, Award } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function AboutPage() {
  const stats = [
    { icon: Coffee, value: "10,000+", label: "Orders Served" },
    { icon: Users, value: "1,000+", label: "Happy Customers" },
    { icon: Clock, value: "5+", label: "Years of Service" },
    { icon: Award, value: "20+", label: "Menu Items" },
  ]

  const team = [
    {
      name: "John Smith",
      role: "Head Chef",
      image: "/placeholder.svg?height=300&width=300",
      bio: "John has over 15 years of culinary experience and specializes in creating delicious, nutritious meals.",
    },
    {
      name: "Sarah Johnson",
      role: "Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah ensures that everything runs smoothly and that customers have the best possible experience.",
    },
    {
      name: "Michael Brown",
      role: "Barista",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael is passionate about coffee and creates the perfect brew every time.",
    },
    {
      name: "Emily Davis",
      role: "Nutritionist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily helps design our menu to ensure that we offer healthy, balanced options for all dietary needs.",
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Learn more about our story, our team, and our mission to provide delicious food and excellent service.
            </p>
          </div>

          {/* Our Story Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Campus Canteen was founded in 2018 with a simple mission: to provide students and faculty with
                  delicious, affordable food in a welcoming environment.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  What started as a small coffee stand has grown into a full-service canteen offering a wide variety of
                  meals, snacks, and beverages to satisfy every taste and dietary requirement.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We're proud to be a part of the campus community and strive to create a space where people can gather,
                  refuel, and enjoy good food and good company.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Our canteen"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-4">
                    <stat.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Mission Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We're committed to providing high-quality food and beverages while promoting sustainability and
                community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Quality Food</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We use fresh, high-quality ingredients to prepare delicious meals that satisfy and nourish.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to reducing waste, using eco-friendly packaging, and sourcing ingredients responsibly.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We strive to create a welcoming space where people can connect, relax, and enjoy their time.
                </p>
              </div>
            </div>
          </section>

          {/* Our Team Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The dedicated people who work hard to provide you with the best possible experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-orange-500 mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

