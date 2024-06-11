import React from 'react';

import Image from 'next/image';
import MotionDiv from '@/components/shared/motions/motion-div';

const SingleFeature = ({
  feature,
}: {
  feature: { icon: string; title: string; description: string };
}) => {
  const { icon, title, description } = feature;

  return (
    <MotionDiv
      variants={{
        hidden: {
          opacity: 0,
          y: -10,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white z-40 rounded-lg border border-gray-200 p-8 shadow-lg transform transition-transform duration-600  dark:border-gray-700 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer"
    >
      <div className=" flex h-16 w-16 items-center justify-center">
        <Image src={icon} width={36} height={36} alt={title} />
      </div>
      <h3 className="mb-5 mt-7 text-xl font-semibold text-gray-700 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </MotionDiv>
  );
};

export default SingleFeature;
