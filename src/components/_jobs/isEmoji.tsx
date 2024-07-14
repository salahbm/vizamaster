'use client';
import { useIsWindows } from '@/hooks/common/useWindows';
import { Country } from '@prisma/client';
import React from 'react';

const IsEmoji = ({ country }: { country: Country }) => {
  const isWindows = useIsWindows();
  return (
    <div className="w-1/2">
      {!isWindows && (
        <h5 className="my-2 text-xl font-bold tracking-tight textGradient text-center">
          {country.name}
        </h5>
      )}
      <div
        className={`w-full h-[150px] md:h-[200px] flex items-center justify-center`}
      >
        {isWindows ? (
          <p className="largeText textGradient">{country.name}</p>
        ) : (
          <p className="text-[140px] md:text-[180px]">{country.emoji}</p>
        )}
      </div>
    </div>
  );
};

export default IsEmoji;
