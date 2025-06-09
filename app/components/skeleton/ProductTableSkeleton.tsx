// components/skeleton/TableSkeleton.tsx
'use client';

export default function ProductTableSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white p-5 rounded-sm">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
      </div>
      
      {/* Title and Search Bar Skeleton */}
      <div className="mt-10 bg-white pt-5">
        <div className="flex justify-between items-center">
          <div className="h-6 w-36 bg-gray-200 rounded ml-5"></div>
          <div className="flex space-x-2 mr-5">
            <div className="h-8 w-40 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </th>
              <th className="border px-4 py-2 text-left">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </th>
              <th className="border px-4 py-2 text-left">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </th>
              <th className="border px-4 py-2 text-left">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </th>
              <th className="border px-4 py-2 text-left">
                <div className="h-4 w-14 bg-gray-200 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <div className="h-6 w-6 bg-gray-200 rounded mr-2"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="border px-4 py-2">
                  <div className="h-4 w-8 bg-gray-200 rounded"></div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}