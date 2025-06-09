export function DataCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Income Card Skeleton */}
      <div className="bg-white rounded-lg p-4 shadow flex justify-between items-center animate-pulse">
        <div className="w-full">
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="bg-gray-200 p-2 rounded-full h-10 w-10"></div>
      </div>
      
      {/* Total Products Card Skeleton */}
      <div className="bg-white rounded-lg p-4 shadow flex justify-between items-center animate-pulse">
        <div className="w-full">
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-200 p-2 rounded-full h-10 w-10"></div>
      </div>
      
      {/* Total Transaction Card Skeleton */}
      <div className="bg-white rounded-lg p-4 shadow flex justify-between items-center animate-pulse">
        <div className="w-full">
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="bg-gray-200 p-2 rounded-full h-10 w-10"></div>
      </div>
    </div>
  );
}
