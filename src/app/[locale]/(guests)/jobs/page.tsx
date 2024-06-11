'use client';
import CountryCard from '@/components/_jobs/country-card';
import MyGlobe from '@/components/shared/globe';

import React from 'react';

const Jobs = () => {
  return (
    <div>
      <div className="mt-35 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 place-items-center ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <CountryCard key={item} />
        ))}
      </div>
      <MyGlobe />
    </div>
  );
};

export default Jobs;
