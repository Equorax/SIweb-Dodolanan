// app/admin/dashboard/page.tsx
'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { 
  DataCardsSkeleton,
  BestSellingProductSkeleton,
  RevenueChartSkeleton
} from './components';
import DataCardsComponent from './components/DataCards';
import BestSellingProductComponent from './components/BestSellingProduct';
import RevenueChartComponent from './components/RevenueChart';

// Komponen untuk loading data cards dengan Suspense
const DataCards = React.lazy(() => import('./components/DataCards'));
// Komponen untuk loading best selling product dengan Suspense
const BestSellingProduct = React.lazy(() => import('./components/BestSellingProduct'));
// Komponen untuk loading revenue chart dengan Suspense
const RevenueChart = React.lazy(() => import('./components/RevenueChart'));

// Mengimpor fungsi data fetching
import { fetchDashboardData } from './components';

export default function Dashboard() {
  // Mengambil data dashboard
  const [dashboardData, setDashboardData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        setError('Terjadi kesalahan saat mengambil data dashboard');
      }
    };

    loadData();
  }, []);

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
           
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {/* Data Cards dengan Suspense */}
          <Suspense fallback={<DataCardsSkeleton />}>
            {dashboardData && (
              <DataCards 
                totalRevenue={dashboardData.totalRevenue}
                totalProducts={dashboardData.totalProducts}
                totalStock={dashboardData.totalStock}
                totalTransactions={dashboardData.totalTransactions}
              />
            )}
          </Suspense>
          
          {/* Best Selling Product dengan Suspense */}
          <Suspense fallback={<BestSellingProductSkeleton />}>
            {dashboardData && (
              <BestSellingProduct 
                bestSellingProduct={dashboardData.bestSellingProduct}
              />
            )}
          </Suspense>
          
          {/* Grafik Pendapatan dengan Suspense */}
          <Suspense fallback={<RevenueChartSkeleton />}>
            {dashboardData && (
              <RevenueChart 
                monthlyRevenue={dashboardData.monthlyRevenue}
              />
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
}