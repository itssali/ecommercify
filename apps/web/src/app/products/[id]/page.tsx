"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  categoryId: number;
  category?: {
    name: string;
  };
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/products/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        // Fetch related products from same category
        const relatedRes = await fetch(`http://localhost:3003/api/products?categoryId=${data.categoryId}&limit=4`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelatedProducts(relatedData.products.filter((p: Product) => p.id !== data.id).slice(0, 4));
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (!product) return;
    
    alert(`Added ${quantity} ${product.name} to cart`);
    // Here you would typically dispatch to your cart state management
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="glass-card p-8 rounded-2xl w-full max-w-md flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="glass-card p-8 rounded-2xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The product you're looking for does not exist or has been removed.
          </p>
          <Link 
            href="/products"
            className="glass-button px-6 py-3 rounded-lg text-gray-800 dark:text-white font-medium inline-block"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  // Placeholder images for gallery in case product doesn't have multiple images
  const images = [
    product.image || "/placeholder.svg",
    `/placeholder-${product.id % 5 + 1}.svg`,
    `/placeholder-${(product.id + 1) % 5 + 1}.svg`,
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link href="/products" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ml-1 md:ml-2">
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-300 ml-1 md:ml-2">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="glass-card overflow-hidden rounded-2xl relative aspect-square">
            <Image 
              src={images[activeImage]} 
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 hover:scale-105"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`glass-card rounded-lg overflow-hidden aspect-square relative ${
                  activeImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
                aria-label={`View image ${index + 1}`}
                title={`View image ${index + 1} of product`}
              >
                <Image 
                  src={img} 
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {product.category && (
              <Link 
                href={`/products?category=${product.categoryId}`}
                className="inline-block text-sm font-medium text-primary-600 mb-2 hover:underline"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <div className="mt-4 flex items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="ml-3 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">20% OFF</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quantity</h2>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="glass-button text-gray-600 dark:text-gray-300 px-4 py-2 rounded-l-lg"
                >
                  -
                </button>
                <span className="w-16 text-center bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700 py-2">
                  {quantity}
                </span>
                <button 
                  onClick={incrementQuantity}
                  className="glass-button text-gray-600 dark:text-gray-300 px-4 py-2 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm mb-6">
              <svg className="w-4 h-4 text-green-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400">In stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">Out of stock</span>
              )}
            </div>

            <div className="space-y-4">
              <button 
                onClick={addToCart}
                disabled={product.stock <= 0}
                className="glass-button w-full py-4 px-6 rounded-xl text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-all duration-200 hover:shadow-lg"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button className="glass-button w-full py-4 px-6 rounded-xl text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-200">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id} 
                href={`/products/${relatedProduct.id}`}
                className="glass-card rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-square relative">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{relatedProduct.name}</h3>
                  <p className="text-primary-600 font-medium mt-1">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 