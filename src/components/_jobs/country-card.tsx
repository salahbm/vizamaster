'use client';
import Link from 'next/link';
import { Country } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { memo } from 'react';
import { useIsWindows } from '@/hooks/common/useWindows';

interface CountryCardProps {
  country: Country;
  jobCount?: number;
}

const CountryCard = memo(({ country, jobCount }: CountryCardProps) => {
  const isWindows = useIsWindows();
  const { id, name, emoji, isNew, title } = country;
  const jobText = jobCount === 1 ? 'job' : 'jobs';

  return (
    <div className="group relative w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
      <Link
        href={`/jobs/${id}`}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-lg"
        aria-label={`View jobs in ${name}`}
      >
        {isNew && (
          <Badge className="absolute top-3 right-3 z-10" variant="default">
            New
          </Badge>
        )}

        <div className="w-full h-[160px] md:h-[180px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          {isWindows ? (
            <div className="flex flex-col items-center justify-center">
              <p
                className="text-4xl md:text-5xl font-bold textGradient"
                aria-hidden="true"
              >
                {name}
              </p>
              <p className="mt-2 text-4xl md:text-6xl" aria-hidden="true">
                {emoji}
              </p>
            </div>
          ) : (
            <p
              className="text-[120px] md:text-[140px] transform group-hover:scale-110 transition-transform duration-500"
              aria-hidden="true"
            >
              {emoji}
            </p>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight textGradient group-hover:underline">
              {name}
            </h3>
            {jobCount !== undefined && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>
                  {jobCount} {jobText}
                </span>
              </div>
            )}
          </div>

          {title && (
            <p className="mt-2 font-normal text-gray-700 dark:text-gray-300 line-clamp-2 text-sm">
              {title}
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
});

CountryCard.displayName = 'CountryCard';

export default CountryCard;
