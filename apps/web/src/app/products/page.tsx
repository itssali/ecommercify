import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// This would normally be fetched from the API
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones.',
    price: 199.99,
    image: '/placeholder-product-1.jpg',
    category: 'Electronics',
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    name: 'Designer Watch',
    description: 'Elegant designer watch with premium materials and precise movement.',
    price: 299.99,
    image: '/placeholder-product-2.jpg',
    category: 'Fashion',
    rating: 4.8,
    stock: 8
  },
  {
    id: 3,
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium sound quality.',
    price: 149.99,
    image: '/placeholder-product-3.jpg',
    category: 'Electronics',
    rating: 4.3,
    stock: 20
  },
  {
    id: 4,
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots.',
    price: 79.99,
    image: '/placeholder-product-4.jpg',
    category: 'Fashion',
    rating: 4.6,
    stock: 12
  },
  {
    id: 5,
    name: 'Fitness Tracker',
    description: 'Track your fitness goals with this advanced fitness tracker.',
    price: 129.99,
    image: '/placeholder-product-5.jpg',
    category: 'Electronics',
    rating: 4.2,
    stock: 18
  },
  {
    id: 6,
    name: 'Ceramic Coffee Mug',
    description: 'Elegant ceramic coffee mug with minimalist design.',
    price: 24.99,
    image: '/placeholder-product-6.jpg',
    category: 'Home & Kitchen',
    rating: 4.7,
    stock: 30
  }
];

// This would also be fetched from the API
const MOCK_CATEGORIES = [
  { id: 1, name: 'All Categories', count: MOCK_PRODUCTS.length },
  { id: 2, name: 'Electronics', count: 3 },
  { id: 3, name: 'Fashion', count: 2 },
  { id: 4, name: 'Home & Kitchen', count: 1 }
];

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-400 h-64">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Explore our collection of premium products designed for quality and style.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="glass p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Newest First</option>
              </select>
              
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Price Range</option>
                <option>Under $50</option>
                <option>$50 - $100</option>
                <option>$100 - $200</option>
                <option>$200+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="glass p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {MOCK_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button className="flex justify-between w-full px-2 py-2 rounded-lg hover:bg-white/50 transition-colors" style={{ color: 'black' }}>
                      <span>{category.name}</span>
                      <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Price Range</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">$0</span>
                    <span className="text-sm text-gray-600">$500+</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-sm text-gray-600 block mb-1">Min</label>
                      <input 
                        type="number" 
                        placeholder="$0" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm text-gray-600 block mb-1">Max</label>
                      <input 
                        type="number" 
                        placeholder="$500" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Rating</h2>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        id={`rating-${rating}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-gray-600">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-8 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="glass-card overflow-hidden group cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-64">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <button 
                        className="glass-button p-2 rounded-full hover:shadow-glow transition-all" 
                        style={{ backgroundColor: 'white', color: 'black', border: '1px solid rgba(0,0,0,0.1)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ stroke: 'black' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-secondary-600 uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-xl font-semibold mt-2 text-gray-900">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Link 
                        href={`/products/${product.id}`}
                        className="text-primary-600 font-medium hover:text-primary-500 transition-colors"
                      >
                        View Details
                      </Link>
                      <button 
                        className="glass-button p-2 rounded-full hover:shadow-glow transition-all" 
                        style={{ backgroundColor: 'white', color: 'black', border: '1px solid rgba(0,0,0,0.1)' }}
                        aria-label="Add to cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ fill: 'black' }}>
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50" style={{ color: 'black' }}>
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ fill: 'black' }}>
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium">1</button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50" style={{ color: 'black' }}>2</button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50" style={{ color: 'black' }}>3</button>
                <span className="px-4 py-2 text-gray-500">...</span>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50" style={{ color: 'black' }}>8</button>
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50" style={{ color: 'black' }}>
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ fill: 'black' }}>
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 