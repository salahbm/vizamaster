import { DB } from '@/lib/db';
import { Job } from '@prisma/client';

export const fetchAllVacancies = async () => {
  const jobs = await DB.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return jobs;
};

export const fetchCountryVacancies = async (
  countryId: string
): Promise<Job[]> => {
  const jobs = await DB.job.findMany({
    where: {
      countryId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return jobs;
};

export const fetchVacancy = async (vacancyId: string): Promise<Job | null> => {
  const vacancy = await DB.job.findUnique({
    where: {
      id: vacancyId,
    },
    //   include: {
    //     attachments: {
    //       orderBy: {
    //         createdAt: 'desc',
    //       },
    //     },
    //     chapters: {
    //       orderBy: {
    //         position: 'desc',
    //       },
    //     },
    //   },
  });

  return vacancy;
};
