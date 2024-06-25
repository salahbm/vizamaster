import { DB } from '@/lib/db';

export const fetchAllCountries = async () => {
  const countries = await DB.country.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return countries;
};
