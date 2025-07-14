import CountryCard from '@/components/_jobs/country-card';
import MyGlobe from '@/components/shared/globe';
import EmptyState from '@/components/shared/no-data';
import SectionHeader from '@/components/shared/SectionHeader';
import { fetchCountriesWithActiveJobCounts } from '@/hooks/admin/fetch-country';

import { Country } from '@prisma/client';
import { Suspense } from 'react';
import { Globe, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600; // Revalidate this page every hour

const Jobs = async () => {
  const t = await getTranslations('Jobs');
  const countries = await fetchCountriesWithActiveJobCounts();
  const vacanciesCount = countries.reduce(
    (total, c) => total + (c._count.jobs || 0),
    0
  );

  const sortedCountries = [...countries].sort((a, b) => {
    const aCount = a._count.jobs;
    const bCount = b._count.jobs;
    if (bCount !== aCount) return bCount - aCount;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container mx-auto px-4 pb-8 pt-24">
      <section className="text-center max-w-4xl mx-auto">
        <SectionHeader
          headerInfo={{
            subtitle: `Global Opportunities`,
            description: `Explore internships, jobs, and career opportunities across the globe. Select a country to view available positions.`,
          }}
        />

        <div className="my-10 flex items-center justify-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {t('activePositions', {
              positions: vacanciesCount,
              country: countries.length,
            })}
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            Loading ...
          </div>
        }
      >
        {countries && countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCountries.map((country) => (
              <CountryCard
                key={country.id}
                country={country as Country}
                jobCount={country._count.jobs}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </Suspense>

      <div className="mt-22">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Globe className="h-5 w-5" />
          <h2 className="text-xl font-semibold">
            {t('exploreGlobalOpportunities')}
          </h2>
        </div>
        <MyGlobe />
      </div>
    </div>
  );
};

export default Jobs;
