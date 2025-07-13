import IsEmoji from '@/components/_jobs/isEmoji';
import VacancyCard from '@/components/_jobs/vacancy-card';
import EmptyState from '@/components/shared/no-data';
import { Preview } from '@/components/shared/preview';
import { Separator } from '@/components/ui/separator';
import { fetchCountry } from '@/hooks/admin/fetch-country';
import { fetchCountryVacancies } from '@/hooks/admin/fetch-vacancy';

export const dynamic = 'force-dynamic';

const JobIdPage = async ({ params }: { params: { jobId: string } }) => {
  const country = await fetchCountry(params.jobId);
  const vacancies = await fetchCountryVacancies(params.jobId);

  return (
    <section className="my-35 px-4">
      {country ? (
        <div className=" bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700  my-2  flex flex-col md:flex-row justify-between  items-center p-4">
          <IsEmoji country={country} />
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
      {vacancies?.length > 0 ? (
        <div className="flew-wrap grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {vacancies.map((vacancy) => (
            <VacancyCard
              vacancy={vacancy}
              key={vacancy.id}
              jobId={params.jobId}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default JobIdPage;
