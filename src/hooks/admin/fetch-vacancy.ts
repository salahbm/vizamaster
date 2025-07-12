import { DB } from '@/lib/db';
import { Job } from '@prisma/client';
import { cache } from 'react';

// Error class for vacancy-related errors
export class VacancyError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'VacancyError';
  }
}

/**
 * Fetch all vacancies with optional filtering
 * @param options Optional filtering parameters
 * @returns Array of Job objects
 */
export const fetchAllVacancies = cache(
  async (options?: {
    limit?: number;
    isActive?: boolean;
    isTrend?: boolean;
  }): Promise<Job[]> => {
    try {
      const jobs = await DB.job.findMany({
        where: {
          ...(options?.isActive !== undefined
            ? { isActive: options.isActive }
            : {}),
          ...(options?.isTrend !== undefined
            ? { isTrend: options.isTrend }
            : {}),
        },
        orderBy: {
          createdAt: 'desc',
        },
        ...(options?.limit ? { take: options.limit } : {}),
      });

      return jobs;
    } catch (error) {
      console.error('Failed to fetch all vacancies:', error);
      throw new VacancyError('Failed to fetch vacancies', 500);
    }
  }
);

/**
 * Fetch vacancies for a specific country
 * @param countryId ID of the country to fetch vacancies for
 * @param options Optional filtering parameters
 * @returns Array of Job objects for the specified country
 */
export const fetchCountryVacancies = cache(
  async (
    countryId: string,
    options?: {
      limit?: number;
      isActive?: boolean;
    }
  ): Promise<Job[]> => {
    if (!countryId) {
      throw new VacancyError('Country ID is required', 400);
    }

    try {
      const jobs = await DB.job.findMany({
        where: {
          countryId,
          ...(options?.isActive !== undefined
            ? { isActive: options.isActive }
            : {}),
        },
        orderBy: {
          createdAt: 'desc',
        },
        ...(options?.limit ? { take: options.limit } : {}),
      });

      return jobs;
    } catch (error) {
      console.error(
        `Failed to fetch vacancies for country ${countryId}:`,
        error
      );
      throw new VacancyError(`Failed to fetch vacancies for country`, 500);
    }
  }
);

/**
 * Fetch a single vacancy by ID
 * @param vacancyId ID of the vacancy to fetch
 * @returns Job object or null if not found
 */
export const fetchVacancy = cache(
  async (vacancyId: string): Promise<Job | null> => {
    if (!vacancyId) {
      throw new VacancyError('Vacancy ID is required', 400);
    }

    try {
      const vacancy = await DB.job.findUnique({
        where: {
          id: vacancyId,
        },
        include: {
          country: true, // Include the related country data
        },
      });

      return vacancy;
    } catch (error) {
      console.error(`Failed to fetch vacancy ${vacancyId}:`, error);
      throw new VacancyError(`Failed to fetch vacancy details`, 500);
    }
  }
);

/**
 * Check if a vacancy exists
 * @param vacancyId ID of the vacancy to check
 * @returns Boolean indicating if the vacancy exists
 */
export const vacancyExists = cache(
  async (vacancyId: string): Promise<boolean> => {
    if (!vacancyId) return false;

    try {
      const count = await DB.job.count({
        where: {
          id: vacancyId,
        },
      });

      return count > 0;
    } catch (error) {
      console.error(`Failed to check if vacancy ${vacancyId} exists:`, error);
      return false;
    }
  }
);
