// app/admin/dashboard/components/BestSellingProductSkeleton.tsx
import React from 'react';

export function BestSellingProductSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow mb-6 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-200 p-3 rounded-lg h-10 w-32"></div>
      </div>
    </div>
  );
}