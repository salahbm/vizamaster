import { DB } from '@/lib/db';
import { Country } from '@prisma/client';
export const dynamic = 'force-dynamic';
export const fetchAllCountries = async () => {
  const countries = await DB.country.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return countries;
};

export const fetchCountry = async (
  countryId: string
): Promise<Country | null> => {
  const country = await DB.country.findUnique({
    where: {
      id: countryId,
    },
  });

  return country;
};
