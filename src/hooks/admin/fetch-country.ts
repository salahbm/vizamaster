import { DB } from '@/lib/db';
import { Country } from '@prisma/client';
import { cache } from 'react';
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

export const fetchCountriesWithActiveJobCounts = cache(async () => {
  const countries = await DB.country.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          jobs: {
            where: { isActive: true },
          },
        },
      },
    },
  });

  return countries;
});
