// app/admin/dashboard/components/RevenueChartSkeleton.tsx
import React from 'react';

export function RevenueChartSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
      
      <div className="w-full h-80 bg-gray-300 rounded"></div>
    </div>
  );
}