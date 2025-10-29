'use client';

import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker - use local file with proper path
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
}

export function ContractCard({
  title,
  country,
  onClick,
  pdfSrc,
}: {
  title: string;
  country: string;
  onClick: () => void;
  pdfSrc: string;
}) {
  const t = useTranslations('Contracts');
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex items-center justify-center bg-white border-2 border-gray-200 rounded-xl p-8 aspect-[3/3.5] transition-all duration-300 hover:border-purple-500 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center space-y-5">
        {/* PDF Thumbnail */}
        <div className="relative w-full h-48 bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-purple-400 transition-colors">
          {!thumbnailError ? (
            <>
              {!thumbnailLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                  <FileText className="w-12 h-12 text-gray-400 animate-pulse" />
                </div>
              )}
              <Document
                file={pdfSrc}
                onLoadSuccess={() => setThumbnailLoaded(true)}
                onLoadError={() => setThumbnailError(true)}
                loading=""
                error=""
                className="flex items-center justify-center h-full"
              >
                <Page
                  pageNumber={1}
                  width={200}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-sm"
                />
              </Document>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
              <FileText className="w-12 h-12 text-orange-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            {t('title')}
          </h3>
          <p className="text-sm text-gray-500">
            {t(`${country?.toLowerCase()}`)}
          </p>
        </div>

        {/* Action hint */}
        <div className="pt-2">
          <span className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors">
            {t('clickToView')}
          </span>
        </div>
      </div>
    </article>
  );
}
