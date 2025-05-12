'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DashboardData {
  totalRevenue: number;
  totalProducts: number;
  totalStock: number;
  totalTransactions: number;
  bestSellingProduct: {
    id: number;
    name: string;
    price: number;
    soldQuantity: number;
  } | null;
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        
        // Format monthlyRevenue data for the chart
        const formattedData = data.monthlyRevenue.map((item: any) => {
          const date = new Date(item.month);
          return {
            name: date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear(),
            revenue: parseFloat(item.revenue)
          };
        });
        
        setDashboardData({
          ...data,
          monthlyRevenue: formattedData
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError('Terjadi kesalahan saat mengambil data dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className='flex h-screen bg-gray-100 justify-center items-center'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-screen bg-gray-100 justify-center items-center'>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-full overflow-hidden mr-2">
                <Image 
                  src="/assets/Atmin.jpg" 
                  alt="Admin" 
                  className="h-full w-full object-cover" 
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-white text-sm">Admin</span>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {/* Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Income Card */}
            <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-yellow-800">Incomes</p>
                <p className="text-lg font-bold text-white">
                  {dashboardData ? formatCurrency(dashboardData.totalRevenue) : 'Loading...'}
                </p>
              </div>
              <div className="bg-yellow-300 p-2 rounded-full">
                <span className="text-yellow-700 text-xl">+</span>
              </div>
            </div>
            
            {/* Total Products Card */}
            <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-yellow-800">Total Produk</p>
                <p className="text-lg font-bold text-white">
                  {dashboardData ? dashboardData.totalProducts : 'Loading...'}
                </p>
                <p className="text-xs text-yellow-800">
                  Stok Tersedia: {dashboardData ? dashboardData.totalStock : 'Loading...'}
                </p>
              </div>
              <div className="bg-yellow-300 p-2 rounded-full">
                <span className="text-yellow-700 text-xl">📦</span>
              </div>
            </div>
            
            {/* Total Transaction Card */}
            <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-yellow-800">Total Transaksi</p>
                <p className="text-lg font-bold text-white">
                  {dashboardData ? dashboardData.totalTransactions : 'Loading...'}
                </p>
              </div>
              <div className="bg-yellow-300 p-2 rounded-full">
                <span className="text-yellow-700 text-xl">🛒</span>
              </div>
            </div>
          </div>
          
          {/* Best Selling Product */}
          <div className="bg-white rounded-lg p-4 shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Produk Paling Laris</h2>
            {dashboardData?.bestSellingProduct ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{dashboardData.bestSellingProduct.name}</p>
                  <p>Harga: {formatCurrency(dashboardData.bestSellingProduct.price)}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <p className="font-bold">Terjual: {dashboardData.bestSellingProduct.soldQuantity} unit</p>
                </div>
              </div>
            ) : (
              <p>Tidak ada data penjualan</p>
            )}
          </div>
          
          {/* Grafik Pendapatan Section */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-2xl font-semibold mb-4">Grafik Pendapatan</h2>
            
            <div className="w-full h-80">
              {dashboardData && dashboardData.monthlyRevenue.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dashboardData.monthlyRevenue}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value:any) => new Intl.NumberFormat('id-ID', {
                        notation: 'compact',
                        compactDisplay: 'short',
                        maximumFractionDigits: 1
                      }).format(value)}
                    />
                    <Tooltip 
                      formatter={(value: any) => [formatCurrency(value), "Pendapatan"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Pendapatan"
                      stroke="#EAB308"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">Tidak ada data grafik pendapatan</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}