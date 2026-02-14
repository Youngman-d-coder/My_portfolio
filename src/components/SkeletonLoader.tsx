import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'avatar' | 'stat' | 'portfolio';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-7 animate-pulse">
            <div className="flex items-center mb-5">
              <div className="w-16 h-16 bg-gray-300 rounded-2xl animate-shimmer"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-shimmer"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-shimmer"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 animate-shimmer"></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-shimmer"></div>
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-shimmer"></div>
              <div className="h-6 w-14 bg-gray-200 rounded-full animate-shimmer"></div>
            </div>
          </div>
        );

      case 'stat':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-shimmer"></div>
                <div className="h-8 bg-gray-300 rounded w-2/3 animate-shimmer"></div>
              </div>
              <div className="w-16 h-16 bg-gray-300 rounded-2xl animate-shimmer"></div>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className="w-32 h-32 bg-gray-300 rounded-3xl animate-shimmer animate-pulse"></div>
        );

      case 'text':
        return (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-shimmer"></div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300 animate-shimmer"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-2xl animate-shimmer"></div>
                <div className="ml-4 flex-1">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 animate-shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-shimmer"></div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default SkeletonLoader;
