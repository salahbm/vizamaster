import { Link } from '@/i18n';
import { Country } from '@prisma/client';
import React from 'react';

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700  my-2 hover:scale-105 transition-transform duration-500">
      <Link href={`/jobs/${country.id}`}>
        <div
          className={`w-full h-[150px] md:h-[200px] flex items-center justify-center bg-slate-100`}
        >
          <p className="text-[140px] md:text-[180px] ">{country.emoji}</p>
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
