import React from 'react';

export const SkeletonLoader = ({ type }) => {
  switch (type) {
    case 'project':
      return (
        <div className="animate-pulse bg-gray-100 dark:bg-dark-800 rounded-lg p-4 h-[400px]">
          <div className="bg-gray-200 dark:bg-dark-700 h-48 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-20"></div>
            <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-20"></div>
          </div>
        </div>
      );
    case 'skill':
      return (
        <div className="animate-pulse bg-gray-100 dark:bg-dark-800 rounded-lg p-4">
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/4 mb-4"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-24"></div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="animate-pulse bg-gray-100 dark:bg-dark-800 rounded-lg p-4">
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2"></div>
        </div>
      );
  }
}; 