'use client';
import { useIsWindows } from '@/hooks/common/useWindows';
import { Link } from '@/i18n';
import { cn } from '@/lib/utils';
import { Country } from '@prisma/client';

const CountryCard = ({ country }: { country: Country }) => {
  const isWindows: boolean = useIsWindows();

  return (
    <div className="w-[350px] h-fit max-h-[330px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg my-2 md:hover:scale-105 transition-transform duration-500">
      <Link href={`/jobs/${country.id}`} className="group">
        <div
          className={cn(
            'w-full h-[150px] md:h-[200px] flex items-center justify-center rounded-lg ',
            isWindows
              ? ' bg-gradient-to-r from-fuchsia-100 to-blue-100 group-hover:from-blue-200 group-hover:to-pink-200  '
              : 'bg-slate-100'
          )}
        >
          {isWindows ? (
            <p className="largeText textGradient">{country.name}</p>
          ) : (
            <p className="text-[140px] md:text-[180px]">{country.emoji}</p>
          )}
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight textGradient">
            {country.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-12 overflow-y-hidden">
            {country.title}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default CountryCard;
