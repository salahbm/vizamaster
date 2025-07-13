'use client';
import { useIsWindows } from '@/hooks/common/useWindows';
import { Country } from '@prisma/client';
import React from 'react';

const IsEmoji = ({ country }: { country: Country }) => {
  const isWindows = useIsWindows();

  // Helper function to render emoji with better Windows support
  const renderEmoji = () => {
    if (isWindows) {
      // For Windows users, show a better styled country name
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-5xl font-bold textGradient">
            {country.name}
          </p>
          {/* Render emoji with special styling for Windows */}
          <p className="mt-2 text-4xl md:text-6xl">{country.emoji}</p>
        </div>
      );
    } else {
      // For non-Windows users, show the emoji as before
      return <p className="text-[140px] md:text-[180px]">{country.emoji}</p>;
    }
  };

  return (
    <div className="w-1/2">
      <h5 className="my-2 text-xl font-bold tracking-tight textGradient text-center">
        {country.name}
      </h5>
      <div
        className={`w-full h-[150px] md:h-[200px] flex items-center justify-center`}
      >
        {renderEmoji()}
      </div>
    </div>
  );
};

export default IsEmoji;
