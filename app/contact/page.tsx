"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      toast({
        title: "Message sent",
        description: "We have received your message and will get back to you soon.",
      })
    }, 1500)
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions, feedback, or suggestions? We'd love to hear from you. Get in touch with us using the form
              below or through our contact information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-3 mr-4">
                        <MapPin className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Address</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 Campus Drive
                          <br />
                          University District
                          <br />
                          City, State 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-3 mr-4">
                        <Phone className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className="text-gray-600 dark:text-gray-400">(123) 456-7890</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-3 mr-4">
                        <Mail className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">info@campuscanteen.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-3 mr-4">
                        <Clock className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Hours</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Monday - Friday: 7:30 AM - 8:00 PM
                          <br />
                          Saturday: 8:00 AM - 6:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <div className="rounded-lg overflow-hidden h-96">
              {/* Replace with actual Google Maps embed */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Google Maps will be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

