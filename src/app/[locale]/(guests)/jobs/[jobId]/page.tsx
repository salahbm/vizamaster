import VacancyCard from '@/components/_jobs/vacancy-card';
import EmptyState from '@/components/shared/no-data';
import { Preview } from '@/components/shared/preview';
import { Separator } from '@/components/ui/separator';
import { fetchCountry } from '@/hooks/admin/fetch-country';
import {
  fetchAllVacancies,
  fetchCountryVacancies,
} from '@/hooks/admin/fetch-vacancy';
import { Link } from '@/i18n';
import React from 'react';

const JobIdPage = async ({ params }: { params: { jobId: string } }) => {
  const country = await fetchCountry(params.jobId);
  const vacancies = await fetchCountryVacancies(params.jobId);
  console.log(`vacancies:`, vacancies);

  return (
    <section className="my-35 px-4">
      {country ? (
        <div className=" bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700  my-2 hover:scale-105 transition-transform duration-500 flex flex-col md:flex-row justify-between  items-center p-4">
          <div className="w-1/2">
            <h5 className="my-2 text-xl font-bold tracking-tight textGradient text-center">
              {country.name}
            </h5>
            <div
              className={`w-full h-[150px] md:h-[200px] flex items-center justify-center`}
            >
              <p className="text-[140px] md:text-[180px] ">{country.emoji}</p>
            </div>
          </div>
          <div className="md:w-1/2 text-center">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-12 overflow-y-hidden">
              {country.title}
            </p>
            <Preview value={country.description} />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
      <Separator className="my-4 bg-neutral-400" />
      {vacancies && (
        <div className="flex flex-col gap-4">
          {vacancies.map((vacancy) => (
            <VacancyCard vacancy={vacancy} key={vacancy.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default JobIdPage;
