import CountryCard from '@/components/_jobs/country-card';
import MyGlobe from '@/components/shared/globe';
import EmptyState from '@/components/shared/no-data';
import { fetchAllCountries } from '@/hooks/admin/fetch-country';
import { Country } from '@prisma/client';

import React from 'react';

const Jobs = async () => {
  const countries = await fetchAllCountries();

  return (
    <div>
      {countries ? (
        <div className="mt-35 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 place-items-center ">
          {countries.map((item) => (
            <CountryCard key={item.id} country={item as Country} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
      <MyGlobe />
    </div>
  );
};

export default Jobs;
