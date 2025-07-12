import Link from 'next/link';
import { Country } from '@prisma/client';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  jobCount?: number;
}

const CountryCard = ({ country, jobCount }: CountryCardProps) => {
  return (
    <div className="group relative w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
      <Link
        href={`/jobs/${country.id}`}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-lg"
        aria-label={`View jobs in ${country.name}`}
      >
        {country.isNew && (
          <Badge className="absolute top-3 right-3 z-10" variant="default">
            New
          </Badge>
        )}

        <div className="w-full h-[160px] md:h-[180px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          <p
            className="text-[120px] md:text-[140px] transform group-hover:scale-110 transition-transform duration-500"
            aria-hidden="true"
          >
            {country.emoji}
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight textGradient group-hover:underline">
              {country.name}
            </h3>
            {jobCount !== undefined && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3 mr-1" />
                <span>
                  {jobCount} {jobCount === 1 ? 'job' : 'jobs'}
                </span>
              </div>
            )}
          </div>

          {country.title && (
            <p className="mt-2 font-normal text-gray-700 dark:text-gray-300 line-clamp-2 text-sm">
              {country.title}
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
              View opportunities
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CountryCard;
