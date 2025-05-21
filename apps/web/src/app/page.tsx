import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        {/* Glass morphism floating shapes */}
        <div className="absolute top-1/4 left-20 w-32 h-32 rounded-full bg-secondary-500/30 backdrop-blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-primary-200/40 backdrop-blur-xl animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl animate-float-slow"></div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Shop with Style, <span className="text-secondary-300">Shop with Ease</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our curated collection of premium products with a modern shopping experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/products" 
                className="px-8 py-3 rounded-lg text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 transition shadow-md dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                style={{ color: 'black' }}
              >
                Shop Now
              </Link>
              <Link 
                href="/categories" 
                className="px-8 py-3 rounded-lg text-lg font-bold bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 transition shadow-md dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                style={{ color: 'black' }}
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our most popular items, hand-picked for quality and style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card overflow-hidden group cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64">
                  <Image 
                    src={`/placeholder-product-${item}.jpg`}
                    alt="Product Image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider">Category</span>
                  <h3 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">Premium Product {item}</h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">From $199.99</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
                      style={{ color: 'inherit' }}
                    >
                      View Details
                    </button>
                    <button 
                      className="glass-button p-2 rounded-full hover:shadow-glow transition-all" 
                      aria-label="Add to cart"
                      style={{ color: 'black', backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.1)' }}
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
          
          <div className="mt-12 text-center">
            <Link 
              href="/products" 
              className="glass-button bg-gray-900 dark:bg-gray-800 px-8 py-3 rounded-lg text-white font-semibold inline-flex items-center group"
              style={{ color: 'white', backgroundColor: '#1f2937' }}
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" style={{ fill: 'white' }}>
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Find exactly what you're looking for by browsing our curated categories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Electronics', 'Clothing', 'Home & Kitchen'].map((category) => (
              <div key={category} className="relative rounded-xl overflow-hidden group cursor-pointer h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <Image 
                  src={`/placeholder-category-${category.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                  alt={category}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                  <span 
                    className="glass-button bg-black/50 dark:bg-black/70 text-sm px-4 py-1 text-white inline-flex items-center group-hover:glass-button-hover transition-all"
                    style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor" style={{ fill: 'white' }}>
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-primary-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Shipping',
                description: 'Free shipping on orders over $50, delivered within 2-5 business days.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ stroke: '#2563eb' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )
              },
              {
                title: 'Secure Payments',
                description: 'All transactions are secure and encrypted for your safety.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ stroke: '#2563eb' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: '24/7 Support',
                description: 'Our customer service team is available around the clock to assist you.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ stroke: '#2563eb' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="glass p-8 rounded-xl flex flex-col items-center text-center bg-white/50 dark:bg-gray-900/50">
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="glass-dark px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ color: 'white' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
