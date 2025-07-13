import Link from 'next/link';
import { Job } from '@prisma/client';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { memo } from 'react';

interface VacancyCardProps {
  vacancy: Job;
  jobId: string;
}

const VacancyCard = memo(({ vacancy, jobId }: VacancyCardProps) => {
  // Determine if the vacancy has an image, use placeholder if not
  const hasImage = vacancy.imgUrl && vacancy.imgUrl.trim() !== '';

  return (
    <div
      className={cn(
        'w-full max-w-[380px] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 my-3 relative',
        vacancy.isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
      )}
    >
      {!vacancy.isActive && (
        <div className="absolute inset-0 bg-slate-300/40 z-10 rounded-lg flex items-center justify-center">
          <Badge className="absolute top-2 right-2 rounded-md z-20 bg-rose-600 text-white flex items-center gap-1 px-2 py-1">
            <AlertCircle className="h-3 w-3" /> Not Active
          </Badge>
        </div>
      )}

      <Link href={`/jobs/${jobId}/${vacancy.id}`} aria-label={vacancy.name}>
        <div className="relative w-full h-[220px] flex items-center justify-center bg-slate-100 rounded-t-lg overflow-hidden">
          <Image
            src={hasImage ? vacancy.imgUrl : '/images/no-data.png'}
            alt={`${vacancy.name} vacancy image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={false}
            loading="lazy"
          />

          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2 z-20">
            {vacancy.isNew && (
              <Badge className="bg-blue-400 text-white px-2 py-1 rounded-md w-fit">
                New
              </Badge>
            )}
            {vacancy.isTrend && (
              <Badge className="bg-orange-400 text-white px-2 py-1 rounded-md w-fit">
                Trending
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          <h2 className="mb-2 text-xl font-bold tracking-tight textGradient line-clamp-2">
            {vacancy.name}
          </h2>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400 line-clamp-2 h-10">
            {vacancy.title || 'No description available'}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">{vacancy.countryName}</span>

            {vacancy.isDeadline && (
              <Badge className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md">
                <Clock className="h-3 w-3" /> Deadline Soon
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

// Display name for debugging
VacancyCard.displayName = 'VacancyCard';

export default VacancyCard;
