import ContactForm from '@/components/shared/contact-form.';
import EmptyState from '@/components/shared/no-data';
import { Preview } from '@/components/shared/preview';
import { Separator } from '@/components/ui/separator';
import { fetchVacancy } from '@/hooks/admin/fetch-vacancy';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { vacancyId: string };
}): Promise<Metadata> {
  try {
    const vacancy = await fetchVacancy(params.vacancyId);

    if (!vacancy) {
      return {
        title: 'Vacancy Not Found',
        description: 'The requested vacancy could not be found.',
      };
    }

    return {
      title: `${vacancy.name} | VIZA MASTER Jobs`,
      description:
        vacancy.title ||
        `Details about ${vacancy.name} position at VIZA MASTER`,
      openGraph: {
        images: [{ url: vacancy.imgUrl }],
      },
    };
  } catch (error) {
    return {
      title: 'Vacancy Details',
      description: 'View job vacancy details at VIZA MASTER',
    };
  }
}

const VacancyDetailPage = async ({
  params,
}: {
  params: { vacancyId: string; jobId: string };
}) => {
  const vacancy = await fetchVacancy(params.vacancyId);

  // If vacancy doesn't exist, show 404
  if (!vacancy) {
    notFound();
  }

  // Format date for better readability
  const formattedDate = new Date(vacancy.createdAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <Link
          href={`/jobs/${params.jobId}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to jobs
        </Link>
      </div>

      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {/* Hero section with image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-slate-100 dark:bg-gray-700 overflow-hidden">
          <Image
            src={vacancy.imgUrl || '/images/no-data.png'}
            alt={`${vacancy.name} - ${vacancy.title || 'Job vacancy'}`}
            fill
            priority
            className="object-contain"
            sizes="(min-width: 1280px) 1024px, 100vw"
          />

          {/* Status badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {vacancy.isNew && (
              <Badge className="bg-blue-400 text-white px-3 py-1 text-sm">
                New
              </Badge>
            )}
            {vacancy.isTrend && (
              <Badge className="bg-orange-400 text-white px-3 py-1 text-sm">
                Trending
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight textGradient">
              {vacancy.name}
            </h1>

            {vacancy.title && (
              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                {vacancy.title}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {vacancy.countryName}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Posted on {formattedDate}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert max-w-none">
            <Preview value={vacancy.description} />
          </div>

          <Separator className="my-8" />

          {/* Contact form */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Apply for this position
            </h2>
            <ContactForm vacancyName={vacancy.name || ''} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VacancyDetailPage;
