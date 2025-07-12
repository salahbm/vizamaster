import { cache } from 'react';
import { DB } from '@/lib/db';
import { Job } from '@prisma/client';

export const fetchAllVacancies = cache(async (options?: {
  limit?: number;
  isActive?: boolean;
  isTrend?: boolean;
  countryId?: string;
}): Promise<Job[]> => {
  try {
    const jobs = await DB.job.findMany({
      where: {
        ...(options?.isActive !== undefined ? { isActive: options.isActive } : {}),
        ...(options?.isTrend !== undefined ? { isTrend: options.isTrend } : {}),
        ...(options?.countryId ? { countryId: options.countryId } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(options?.limit ? { take: options.limit } : {}),
      include: {
        country: true,
      },
    });
    return jobs;
  } catch (error) {
    console.error('Failed to fetch vacancies:', error);
    return [];
  }
});

export const fetchVacancyById = cache(async (id: string): Promise<Job | null> => {
  try {
    const job = await DB.job.findUnique({
      where: { id },
      include: {
        country: true,
      },
    });
    return job;
  } catch (error) {
    console.error(`Failed to fetch vacancy with ID ${id}:`, error);
    return null;
  }
});

export const fetchVacanciesStats = cache(async () => {
  try {
    const totalCount = await DB.job.count();
    const activeCount = await DB.job.count({
      where: { isActive: true },
    });
    const trendingCount = await DB.job.count({
      where: { isTrend: true },
    });
    
    const latestUpdate = await DB.job.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true },
    });

    return {
      total: totalCount,
      active: activeCount,
      trending: trendingCount,
      activeRate: totalCount > 0 ? (activeCount / totalCount) * 100 : 0,
      trendingRate: totalCount > 0 ? (trendingCount / totalCount) * 100 : 0,
      lastUpdated: latestUpdate?.updatedAt || null,
    };
  } catch (error) {
    console.error('Failed to fetch vacancy statistics:', error);
    return {
      total: 0,
      active: 0,
      trending: 0,
      activeRate: 0,
      trendingRate: 0,
      lastUpdated: null,
    };
  }
});
