import CountryCard from '@/components/_jobs/country-card';
import MyGlobe from '@/components/shared/globe';
import EmptyState from '@/components/shared/no-data';
import SectionHeader from '@/components/shared/SectionHeader';
import { fetchAllCountries } from '@/hooks/admin/fetch-country';

import { Country } from '@prisma/client';
import { Suspense } from 'react';
import { Globe, Search } from 'lucide-react';
import { fetchAllVacancies } from '@/hooks/admin/fetch-vacancy';

export const revalidate = 3600; // Revalidate this page every hour

const Jobs = async () => {
  // Fetch data in parallel for better performance
  const [countries, vacancies] = await Promise.all([
    fetchAllCountries(),
    fetchAllVacancies({ isActive: true }),
  ]);

  // Calculate job count per country
  const jobCountByCountry =
    vacancies?.reduce((acc, job) => {
      if (job.countryId) {
        acc[job.countryId] = (acc[job.countryId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {};

  // Sort countries by job count (most jobs first) and then by name
  const sortedCountries = [...(countries || [])].sort((a, b) => {
    const aCount = jobCountByCountry[a.id] || 0;
    const bCount = jobCountByCountry[b.id] || 0;
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
            {vacancies?.length || 0} active positions across{' '}
            {countries?.length || 0} countries
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            Loading countries...
          </div>
        }
      >
        {countries && countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCountries.map((country) => (
              <CountryCard
                key={country.id}
                country={country as Country}
                jobCount={jobCountByCountry[country.id] || 0}
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
            Explore Global Opportunities
          </h2>
        </div>
        <MyGlobe />
      </div>
    </div>
  );
};

export default Jobs;
