'use client';

import React from 'react';

interface LoaderWrapperProps {
  loading: boolean;
  children: React.ReactNode;
}

export const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        {/* Spinner or animation */}
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};