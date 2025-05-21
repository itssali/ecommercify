"use client";

import Link from "next/link";

export function Header({ 
  darkMode, 
  cartOpen,
  setCartOpen, 
  searchOpen,
  setSearchOpen
}: { 
  darkMode: boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}) {
  // Dark mode styling for all buttons
  const buttonStyle = { color: 'white', backgroundColor: 'rgba(17, 25, 40, 0.5)' };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/90 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">Ecommercify</span>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/products" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" style={{ color: 'white' }}>
              Products
            </Link>
            <Link href="/categories" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" style={{ color: 'white' }}>
              Categories
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" style={{ color: 'white' }}>
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" style={{ color: 'white' }}>
              Contact
            </Link>
          </nav>
          
          {/* Right section */}
          <div className="flex items-center space-x-2">            
            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="glass-button p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
              aria-label="Search"
              style={buttonStyle}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Cart Button */}
            <button 
              onClick={() => setCartOpen(true)}
              className="glass-button relative p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
              aria-label="View cart"
              style={buttonStyle}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary-600 rounded-full">3</span>
            </button>
            
            {/* User Button */}
            <button 
              className="glass-button p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
              style={buttonStyle}
            >
              <span className="sr-only">Account</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden glass-button p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              style={buttonStyle}
            >
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 