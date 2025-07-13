'use client';
import PeopleMarquee from '@/components/_home/marquee';
import SectionHeader from '@/components/shared/SectionHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const Results: React.FC = () => {
  const t = useTranslations('Results');

  const images = useMemo(
    () => Array.from({ length: 33 }, (_, index) => `/results/${index + 1}.jpg`),
    []
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filteredImages] = useState<string[]>(images);
  const [visibleCount, setVisibleCount] = useState(12); // Start with 15 images
  const galleryRef = useRef<HTMLDivElement>(null);

  // For masonry layout calculations
  const [columns, setColumns] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(2);
      } else if (window.innerWidth < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Get visible images
  const currentImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  // Calculate images for each column in the masonry layout
  const getColumnImages = (colIndex: number) => {
    return currentImages.filter((_, index) => index % columns === colIndex);
  };

  // Handle image click to show enlarged view
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close enlarged view
  const closeEnlargedView = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Handle loading more images
  const loadMoreImages = () => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 10, filteredImages.length));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="relative py-12 md:mt-20 mt-10 px-4 sm:px-6 lg:px-8">
      <SectionHeader
        headerInfo={{
          subtitle: t('header.subtitle'),
          description: t('header.description'),
        }}
      />

      {/* College-style photo gallery */}
      <div className="mt-12" ref={galleryRef}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 md:gap-4">
              {getColumnImages(colIndex).map((image, index) => {
                // Randomize sizes for more dynamic college-style layout
                const isLarge = Math.random() > 0.7;
                const aspectRatio =
                  Math.random() > 0.5 ? 'aspect-square' : 'aspect-[3/4]';

                return (
                  <motion.div
                    key={`${colIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: colIndex * 0.1 + index * 0.05 }}
                    className={`relative ${
                      isLarge ? 'row-span-2' : ''
                    } ${aspectRatio} overflow-hidden group`}
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image}
                      alt={`Result ${colIndex + index * columns}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      priority={index < 4} // Prioritize first few images
                      unoptimized // Use unoptimized for local static images
                    />
                    <div className="hidden absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 md:flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        {t('view')}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreImages}
              disabled={loading}
              className={`px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t('loading')}
                </>
              ) : (
                <>{t('loadMore')}</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Enlarged image view */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeEnlargedView}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white text-xl p-2 z-10"
              onClick={closeEnlargedView}
            >
              ✕
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                priority={true} // Always prioritize the enlarged view
                unoptimized // Use unoptimized for local static images
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <PeopleMarquee />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
    </div>
  );
};

export default Results;
