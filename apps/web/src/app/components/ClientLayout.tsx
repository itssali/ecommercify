"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Force dark mode permanently
  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    
    // Add direct style fix for permanent dark mode
    const style = document.createElement('style');
    style.id = 'dark-mode-fixes';
    style.innerHTML = `
      html {
        color-scheme: dark;
      }
      body {
        background-color: rgb(17, 17, 17);
        color: rgb(229, 231, 235);
      }
      .dark .glass-button,
      .glass-button {
        color: white !important;
        -webkit-text-fill-color: white !important;
        background-color: rgba(17, 25, 40, 0.5) !important;
      }
      
      .glass-card,
      .glass,
      [class*="glass"] {
        border-color: rgba(255, 255, 255, 0.05) !important;
        background-color: rgba(17, 25, 40, 0.65) !important;
      }

      /* Force all text to be white */
      *:not(svg *) {
        color: white !important;
      }

      /* Special overrides for specific cases */
      button svg,
      a svg {
        fill: white !important;
        stroke: white !important;
      }

      /* Override any light mode colors */
      .bg-gray-50, .bg-white, .bg-gray-100 {
        background-color: rgb(17, 17, 17) !important;
      }

      /* Fix input fields */
      input, select, textarea {
        background-color: rgba(17, 25, 40, 0.7) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: white !important;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      const darkStyles = document.getElementById('dark-mode-fixes');
      if (darkStyles) darkStyles.remove();
    };
  }, []);

  return (
    <>
      <Header 
        darkMode={true}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-start pt-24 justify-center transition-all duration-300">
          <div className="glass-card p-5 rounded-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search</h2>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-800 dark:text-white"
              />
              <button 
                className="absolute right-2 top-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Submit search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {["T-shirts", "Sneakers", "Headphones", "Watches", "Smartphones"].map((term) => (
                  <button key={term} className="glass-button px-2 py-1 rounded-lg text-xs text-gray-700 dark:text-gray-300" style={{ color: 'white' }}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Clickable backdrop to close the overlay */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          ></div>
        </div>
      )}
      
      {/* Cart Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex justify-end transition-all duration-300">
          <div className="glass-card w-full max-w-xs h-full bg-white/80 dark:bg-gray-900/80 overflow-auto shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Cart (3)</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md glass-card">
                      <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Product {item}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Qty: 1
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${(item * 19.99).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Summary */}
              <div className="space-y-1 py-3 text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
                  <p className="font-medium text-gray-900 dark:text-white">$59.97</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 dark:text-gray-400">Shipping</p>
                  <p className="font-medium text-gray-900 dark:text-white">$4.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 dark:text-gray-400">Tax</p>
                  <p className="font-medium text-gray-900 dark:text-white">$5.28</p>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-white">Total</p>
                  <p className="text-primary-600">$70.24</p>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button className="glass-button w-full py-2 px-3 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 font-medium">
                Checkout
              </button>
            </div>
          </div>
          {/* Clickable backdrop to close the overlay */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          ></div>
        </div>
      )}
      
      {children}
      <Footer />
    </>
  );
} 