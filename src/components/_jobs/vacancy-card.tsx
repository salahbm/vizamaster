import { Link } from '@/i18n';
import { cn } from '@/lib/utils';
import { Job } from '@prisma/client';
import Image from 'next/image';
import { Badge } from '../ui/badge';

const VacancyCard = ({ vacancy, jobId }: { vacancy: Job; jobId: string }) => {
  return (
    <div
      className={cn(
        'w-[350px] bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 my-2 relative',
        vacancy.isActive ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
    >
      <Link href={vacancy.isActive ? `/jobs/${jobId}/${vacancy.id}` : '#'}>
        <div className="relative w-full h-[250px] md:h-[300px] flex items-center justify-center bg-slate-100">
          <Image
            src={vacancy.imgUrl}
            alt="Picture of the author"
            fill
            sizes="(100vw, 100vh)"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight textGradient">
            {vacancy.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-12 overflow-y-hidden">
            {vacancy.title}
          </p>
        </div>
      </Link>
      <div
        className={cn(
          vacancy.isActive ? 'opacity-0' : 'opacity-100',
          'absolute top-0 right-0 bg-slate-300/40 z-50 w-full h-full rounded-lg'
        )}
      />
      {vacancy.isActive === false && (
        <Badge
          className={cn(
            'absolute top-2 right-2 rounded-md z-50 bg-rose-600 text-white'
          )}
        >
          Not Active
        </Badge>
      )}
      {vacancy.isDeadline && (
        <Badge
          className={cn(
            'absolute top-8 right-2 rounded-md z-50 bg-primary text-white'
          )}
        >
          Finish Soon
        </Badge>
      )}
    </div>
  );
};

export default VacancyCard;
