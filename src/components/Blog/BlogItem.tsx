'use client';
import { Job } from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { useIsWindows } from '@/hooks/common/useWindows';

interface BlogItemProps {
  blog: Job;
}

const BlogItem = memo(({ blog }: BlogItemProps) => {
  const { id, imgUrl, title, name, countryId } = blog;
  const isWindows = useIsWindows();

  // Format the blog title and name for better display
  const displayName = name.length > 40 ? `${name.slice(0, 40)}...` : name;
  const displayTitle = title || '';

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Link
      href={`/jobs/${countryId}/${id}`}
      className="block h-full"
      aria-label={`Read more about ${name}`}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white dark:bg-gray-800 p-2 pb-6 shadow-lg hover:shadow-xl transition-all duration-300 h-[370px] flex flex-col"
      >
        <div className="relative block aspect-[368/239] overflow-hidden rounded-lg">
          <Image
            src={imgUrl}
            alt={displayTitle || displayName}
            fill
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-105"
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 336px, calc(100vw - 32px)"
            priority={false}
          />
        </div>

        <div className="px-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="mb-2 mt-4 text-lg font-medium text-neutral-700 dark:text-white group-hover:text-primary transition-colors duration-300">
              {isWindows ? '💬' : '💭'} {displayName}
            </h3>
            {title && (
              <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                {displayTitle}
              </p>
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View details →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

BlogItem.displayName = 'BlogItem';

export default BlogItem;
