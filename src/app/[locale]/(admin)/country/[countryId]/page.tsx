import { toast } from '@/components/ui/use-toast';
import { fetchCountry } from '@/hooks/admin/fetch-country';
import UpdateCountryForm from './update-coutry';
import { Country } from '@prisma/client';
import EmptyState from '@/components/shared/no-data';

const CountryIdPage = async ({ params }: { params: { countryId: string } }) => {
  const country = await fetchCountry(params.countryId);
  if (!country) {
    return <EmptyState />;
  }

  return (
    <div className="flex justify-center h-full p-6">
      <UpdateCountryForm
        initialData={country as Country}
        countryId={country?.id as string}
      />
    </div>
  );
};

export default CountryIdPage;
