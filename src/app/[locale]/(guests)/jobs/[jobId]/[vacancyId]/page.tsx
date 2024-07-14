import ContactForm from '@/components/shared/contact-form.';
import EmptyState from '@/components/shared/no-data';
import { Preview } from '@/components/shared/preview';
import { Separator } from '@/components/ui/separator';
import { fetchVacancy } from '@/hooks/admin/fetch-vacancy';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const VacancyId = async ({ params }: { params: { vacancyId: string } }) => {
  const vacancy = await fetchVacancy(params.vacancyId);
  return (
    <section className="my-20 px-4">
      {vacancy ? (
        <div className="w-full my-4 flex flex-col  p-6">
          <div className="  flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src={vacancy.imgUrl}
              alt="Vacancy image"
              width={1000}
              height={400}
              className="w-full rounded-lg shadow-lg object-center "
            />
          </div>

          <h5 className="mt-4 text-2xl font-bold tracking-tight textGradient text-center">
            {vacancy.name}
          </h5>

          <p className="mt-2 mb-15 text-lg font-normal text-gray-700 dark:text-gray-400 max-h-12 overflow-y-hidden text-center">
            {vacancy.title}
          </p>

          <Preview value={vacancy.description} />

          <Separator className="my-15 bg-neutral-400" />

          <ContactForm />
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default VacancyId;
