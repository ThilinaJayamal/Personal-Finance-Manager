import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-6 p-4">
      
      {/* Header Skeleton */}
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-4 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="h-64 bg-gray-200 rounded-lg"></div>

      {/* Transactions List */}
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex justify-between items-center bg-white p-4 shadow rounded">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-40"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SkeletonLoader;
