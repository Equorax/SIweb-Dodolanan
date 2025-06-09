// app/admin/dashboard/page.tsx
'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { 
  DataCardsSkeleton,
  BestSellingProductSkeleton,
  RevenueChartSkeleton
} from './components';
import DataCards from './components/DataCards';
import BestSellingProduct from './components/BestSellingProduct';
import RevenueChart from './components/RevenueChart';
import { fetchDashboardData } from './components';

// Header Skeleton Component
function HeaderSkeleton() {
  return (
    <header className="bg-gray-200 shadow-md animate-pulse">
      <div className="flex justify-between items-center p-4">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </header>
  );
}

// Complete Dashboard Skeleton (shows while data is loading)
function DashboardSkeleton() {
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Skeleton */}
        <HeaderSkeleton />
        
        {/* Main Content Skeleton */}
        <main className="flex-1 overflow-auto p-4">
          {/* Data Cards Skeleton */}
          <DataCardsSkeleton />
          
          {/* Best Selling Product Skeleton */}
          <BestSellingProductSkeleton />
          
          {/* Revenue Chart Skeleton */}
          <RevenueChartSkeleton />
        </main>
      </div>
    </div>
  );
}

// Data Wrapper Components for better loading states
function DataCardsWrapper({ dashboardData }: { dashboardData: any }) {
  if (!dashboardData) return <DataCardsSkeleton />;
  
  return (
    <DataCards 
      totalRevenue={dashboardData.totalRevenue}
      totalProducts={dashboardData.totalProducts}
      totalStock={dashboardData.totalStock}
      totalTransactions={dashboardData.totalTransactions}
    />
  );
}

function BestSellingProductWrapper({ dashboardData }: { dashboardData: any }) {
  if (!dashboardData) return <BestSellingProductSkeleton />;
  
  return (
    <BestSellingProduct 
      bestSellingProduct={dashboardData.bestSellingProduct}
    />
  );
}

function RevenueChartWrapper({ dashboardData }: { dashboardData: any }) {
  if (!dashboardData) return <RevenueChartSkeleton />;
  
  return (
    <RevenueChart 
      monthlyRevenue={dashboardData.monthlyRevenue}
    />
  );
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Add artificial delay to show skeleton better (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        setError('Terjadi kesalahan saat mengambil data dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Show complete skeleton while initial loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className='flex h-screen bg-gray-100'>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-yellow-500 shadow-md">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            </div>
          </header>
          
          {/* Error Content */}
          <main className="flex-1 overflow-auto p-4 flex justify-center items-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
              <h2 className="text-lg font-semibold mb-2">Oops! Terjadi Kesalahan</h2>
              <p className="mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Muat Ulang
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show actual dashboard with individual component skeletons
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {/* Data Cards with individual loading */}
          <Suspense fallback={<DataCardsSkeleton />}>
            <DataCardsWrapper dashboardData={dashboardData} />
          </Suspense>
          
          {/* Best Selling Product with individual loading */}
          <Suspense fallback={<BestSellingProductSkeleton />}>
            <BestSellingProductWrapper dashboardData={dashboardData} />
          </Suspense>
          
          {/* Revenue Chart with individual loading */}
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChartWrapper dashboardData={dashboardData} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}