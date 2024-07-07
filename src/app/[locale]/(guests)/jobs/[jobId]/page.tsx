import VacancyCard from '@/components/_jobs/vacancy-card';
import EmptyState from '@/components/shared/no-data';
import { Preview } from '@/components/shared/preview';
import { Separator } from '@/components/ui/separator';
import { fetchCountry } from '@/hooks/admin/fetch-country';
import { fetchCountryVacancies } from '@/hooks/admin/fetch-vacancy';

const JobIdPage = async ({ params }: { params: { jobId: string } }) => {
  const country = await fetchCountry(params.jobId);
  const vacancies = await fetchCountryVacancies(params.jobId);

  return (
    <section className="my-35 px-4">
      {country ? (
        <div className=" bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700  my-2  flex flex-col md:flex-row justify-between  items-center p-4">
          <div className="w-1/2">
            <h5 className="my-2 text-xl font-bold tracking-tight textGradient text-center">
              {country.name}
            </h5>
            <div
              className={`w-full h-[150px] md:h-[200px] flex items-center justify-center`}
            >
              <p className="text-[140px] md:text-[180px] hover:scale-110 transition-transform duration-500 cursor-default">
                {country.emoji}
              </p>
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
        <div className=" px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 place-items-center">
          {vacancies.map((vacancy) => (
            <VacancyCard
              vacancy={vacancy}
              key={vacancy.id}
              jobId={params.jobId}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default JobIdPage;
