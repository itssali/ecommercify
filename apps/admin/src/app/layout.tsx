import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ecommercify Admin - Dashboard",
  description: "Admin dashboard for Ecommercify e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
            <div className="p-6 border-b border-gray-800">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold">Ecommercify</span>
                <span className="ml-2 text-xs bg-primary-600 px-2 py-0.5 rounded-md">Admin</span>
              </Link>
            </div>
            
            <nav className="mt-6">
              <div className="px-4 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Dashboard
                </p>
              </div>
              <Link 
                href="/" 
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Overview
              </Link>
              
              <div className="px-4 mt-6 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Management
                </p>
              </div>
              <Link 
                href="/products" 
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Products
              </Link>
              <Link 
                href="/categories" 
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Categories
              </Link>
              <Link 
                href="/orders" 
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Orders
              </Link>
              <Link 
                href="/users" 
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Users
              </Link>
              
              <div className="px-4 mt-6 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Settings
                </p>
              </div>
              <Link 
                href="/settings" 
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Settings
              </Link>
            </nav>
          </aside>
          
          {/* Mobile sidebar toggle */}
          <div className="md:hidden fixed bottom-6 right-6 z-50">
            <button className="bg-primary-600 text-white p-3 rounded-full shadow-lg" aria-label="Toggle menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Top Navigation */}
            <header className="bg-white shadow-sm">
              <div className="px-6 py-4 flex justify-between items-center">
                <div className="md:hidden">
                  <span className="text-xl font-bold">Ecommercify Admin</span>
                </div>
                
                <div className="flex items-center ml-auto">
                  <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none" aria-label="Notifications">
                    <span className="sr-only">Notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  
                  <div className="ml-4 relative flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                      A
                    </div>
                    <span className="ml-2 font-medium text-gray-700">Admin</span>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Page Content */}
            <main>
        {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
