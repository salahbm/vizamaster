import { Link } from '@/i18n';
import { Country, Job } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const VacancyCard = ({ vacancy, jobId }: { vacancy: Job; jobId: string }) => {
  return (
    <div className="w-[350px] bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700  my-2 ">
      <Link href={`/jobs/${jobId}/${vacancy.id}`}>
        <div
          className={`relative w-full h-[250px] md:h-[300px] flex items-center justify-center bg-slate-100`}
        >
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
    </div>
  );
};

export default VacancyCard;
