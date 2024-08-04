import CountryCard from '@/components/_jobs/country-card';
import MyGlobe from '@/components/shared/globe';
import EmptyState from '@/components/shared/no-data';
import SectionHeader from '@/components/shared/SectionHeader';
import { fetchAllCountries } from '@/hooks/admin/fetch-country';
import { Country } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

import React from 'react';

export const dynamic = 'force-dynamic';

const Jobs = async () => {
  try {
    const countries = await fetchAllCountries();
    const t = await getTranslations('Jobs');
    return (
      <div>
        {countries && countries.length > 0 ? (
          <div className="my-35 px-4 flex flex-wrap items-center justify-center gap-4">
            <SectionHeader
              headerInfo={{
                subtitle: t('header.subtitle'),
                description: t('header.description'),
              }}
            />
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
  } catch (error) {
    console.error('Error fetching countries:', error);
    return <EmptyState />;
  }
};

export default Jobs;
