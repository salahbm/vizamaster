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
        <div className="my-35 px-4 flex flex-wrap items-center justify-center gap-4">
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
