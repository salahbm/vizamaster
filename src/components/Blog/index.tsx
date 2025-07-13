import BlogItem from './BlogItem';
import SectionHeader from '../shared/SectionHeader';
import { fetchAllVacancies } from '@/hooks/admin/fetch-vacancy';
import { getTranslations } from 'next-intl/server';
import { Job } from '@prisma/client';
import Link from 'next/link';

const Blog = async () => {
  const vacancies = await fetchAllVacancies();
  const t = await getTranslations('Blog');

  // Filter trending and active vacancies
  const trendingVacancies = vacancies
    .filter((vacancy) => vacancy.isTrend && vacancy.isActive)
    .slice(0, 3);

  // Check if we have any trending vacancies to display
  const hasTrendingVacancies = trendingVacancies.length > 0;

  return (
    <section id="blog" className="py-16 lg:py-20 xl:py-24">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* Section Title */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: t('header.title'),
              subtitle: t('header.subtitle'),
              description: t('header.description'),
            }}
          />
        </div>

        {/* Notification Banner */}
        <div className="mx-auto mt-8 text-center">
          <p className="inline-block md:w-4/5 lg:w-3/5 xl:w-[46%] text-center bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-2xl shadow-md cursor-pointer z-50 text-neutral-600 dark:bg-amber-900/30 dark:hover:bg-amber-900/40 dark:text-amber-100 transition-colors duration-300">
            {t('note')}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="mx-auto mt-12 lg:mt-16 max-w-screen-lg px-4 md:px-8 xl:px-0">
          {hasTrendingVacancies ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {trendingVacancies.map((blog: Job) => (
                <BlogItem blog={blog} key={blog.id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t('no_trending_jobs')}
              </p>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                {t('view_all_jobs')}
              </Link>
            </div>
          )}
        </div>

        {/* View All Link */}
        {hasTrendingVacancies && (
          <div className="text-center mt-10">
            <Link
              href="/jobs"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300"
            >
              {t('view_all')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
