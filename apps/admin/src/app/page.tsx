import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboard() {
  // Mock data for the dashboard
  const stats = [
    { id: 1, name: 'Total Sales', value: '$12,456.78', change: '+12.5%', trend: 'up' },
    { id: 2, name: 'Orders', value: '142', change: '+8.2%', trend: 'up' },
    { id: 3, name: 'Customers', value: '2,845', change: '+18.3%', trend: 'up' },
    { id: 4, name: 'Conversion', value: '3.6%', change: '-1.2%', trend: 'down' },
  ];

  const recentOrders = [
    { id: '#ORD-8793', customer: 'John Doe', date: '2023-05-12', total: '$128.45', status: 'Delivered' },
    { id: '#ORD-8792', customer: 'Jane Smith', date: '2023-05-11', total: '$295.99', status: 'Processing' },
    { id: '#ORD-8791', customer: 'Robert Johnson', date: '2023-05-11', total: '$89.95', status: 'Shipped' },
    { id: '#ORD-8790', customer: 'Emily Davis', date: '2023-05-10', total: '$152.50', status: 'Delivered' },
    { id: '#ORD-8789', customer: 'Michael Brown', date: '2023-05-10', total: '$74.99', status: 'Processing' },
  ];

  const topProducts = [
    { id: 1, name: 'Premium Wireless Headphones', price: '$199.99', sold: 28, revenue: '$5,599.72' },
    { id: 2, name: 'Designer Watch', price: '$299.99', sold: 15, revenue: '$4,499.85' },
    { id: 3, name: 'Smart Home Speaker', price: '$149.99', sold: 22, revenue: '$3,299.78' },
    { id: 4, name: 'Leather Wallet', price: '$79.99', sold: 34, revenue: '$2,719.66' },
    { id: 5, name: 'Fitness Tracker', price: '$129.99', sold: 19, revenue: '$2,469.81' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin!</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-4">
            <button className="glass-button hover:glass-button-hover px-4 py-2 rounded-lg text-gray-900 font-medium">
              Download Report
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-white font-medium transition-colors">
              + Add Product
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="glass p-6 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.trend === 'up' ? (
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 01.994.89l.006.11v5a1 1 0 11-2 0V8.41l-4.293 4.293a1 1 0 01-1.414 0L8 10.41l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L10.59 10l3.293-3.293A.996.996 0 0114.59 7H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-.994-.89l-.006-.11v-5a1 1 0 112 0v2.59l4.293-4.293a1 1 0 011.414 0L16 9.59l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0L13.41 10 10.41 13H12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
          
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link href="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                        <Link href={`/orders/${order.id}`}>
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Top Products */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <Link href="/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sold
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                        <Link href={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sold} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
