import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-[22px] font-bold text-gray-900 dark:text-white">Upskill</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Learn from the best. Grow at your own pace. Build a career you're proud of.
            </p>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Learn</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] transition">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] transition">
                  Become an Instructor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500 dark:text-gray-400">
                hello@upskill.com
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                
              </li>
              <li className="flex items-center gap-4 pt-1">
                <Link href="https://github.com" className="text-gray-400 hover:text-[#0EA5E9] transition text-sm">
                  GitHub
                </Link>
                <Link href="https://instagram.com" className="text-gray-400 hover:text-[#0EA5E9] transition text-sm">
                  Instagram
                </Link>
                <Link href="https://youtube.com" className="text-gray-400 hover:text-[#0EA5E9] transition text-sm">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            © 2026 Upskill. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/policy" className="text-sm text-gray-400 hover:text-[#0EA5E9] transition">
              Privacy
            </Link>
            <Link href="/faq" className="text-sm text-gray-400 hover:text-[#0EA5E9] transition">
              FAQ
            </Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-[#0EA5E9] transition">
              About
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer