import Link from "next/link"
import { Coffee, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold">Campus Canteen</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Serving delicious meals and snacks to fuel your day. Quality food at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/menu"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  Special Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-500"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact Us</h3>
            <address className="not-italic text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>123 Campus Drive</p>
              <p>University District</p>
              <p>Email: info@campuscanteen.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Campus Canteen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

