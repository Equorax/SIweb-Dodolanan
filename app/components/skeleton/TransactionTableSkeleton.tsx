

import React from 'react';

export default function TransactionTableSkeleton() {
  // Create array for skeleton rows
  const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div>
      {/* Header Skeleton */}
      <div className="bg-gray-200 p-5 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-40"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
      
      {/* Search and Button Section Skeleton */}
      <div className='mt-10 bg-gray-200 pt-5 animate-pulse'>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-36 ml-5"></div>
          <div className="flex space-x-2 mr-5">
            {/* Search Input Skeleton */}
            <div className="h-8 bg-white rounded w-40"></div>
            {/* Buttons Skeleton */}
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-16"></div>
            <div className="h-8 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Status Indicator Skeleton */}
      <div className="bg-gray-200 px-5 py-2 animate-pulse">
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-40"></div>
        </div>
      </div>

      {/* Pagination Controls Top Skeleton */}
      <div className="bg-gray-100 p-4 border-b animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-36"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-white rounded w-8 border"></div>
              <div className="h-8 bg-white rounded w-8 border"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-gray-200">
          {/* Table Header Skeleton */}
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
              </th>
            </tr>
          </thead>
          
          {/* Table Body Skeleton */}
          <tbody>
            {skeletonRows.map((index) => (
              <tr key={index} className="bg-white">
                {/* ID Column */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-8 animate-pulse"></div>
                </td>
                
                {/* Product Name Column with Image */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-300 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </div>
                </td>
                
                {/* Price Column */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                </td>
                
                {/* Quantity Column */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-8 animate-pulse"></div>
                </td>
                
                {/* Total Column */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                </td>
                
                {/* Date Column */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                </td>
                
                {/* Action Column */}
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls Bottom Skeleton */}
      <div className="bg-gray-100 p-4 border-t animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Page Info Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          
          {/* Navigation Buttons Skeleton */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <div className="h-8 bg-gray-300 rounded w-16"></div>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="h-8 bg-white rounded w-8 border"></div>
              ))}
            </div>
            
            {/* Next Button */}
            <div className="h-8 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}