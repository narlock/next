import './globals.css'
import Link from 'next/link';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'narlock',
  description: 'narlock\'s website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-700 text-white flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="inline-flex bg-gray-800 rounded-lg shadow-md px-8 py-3 mx-auto mt-4 space-x-8 border-1 border-white">
          <Link href="/" className="hover:text-gray-300 transition-colors duration-200">Home</Link>
          <Link href="/projects" className="hover:text-gray-300 transition-colors duration-200">Projects</Link>
          <Link href="/blog" className="hover:text-gray-300 transition-colors duration-200">Blog</Link>
        </nav>

        {/* Page Content */}
        <main className="flex flex-col items-center justify-center flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
