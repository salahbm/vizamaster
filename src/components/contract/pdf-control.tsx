'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PdfControls({
  pageNumber,
  numPages,
  onPrev,
  onNext,
}: {
  pageNumber: number;
  numPages: number | null;
  onPrev: () => void;
  onNext: () => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1 border">
      <button
        onClick={onPrev}
        disabled={pageNumber <= 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 text-gray-700" />
      </button>

      <span className="text-sm font-medium text-gray-700 px-3 min-w-[100px] text-center">
        {t('Contracts.pageNumber', { pageNumber, numPages })}
      </span>

      <button
        onClick={onNext}
        disabled={numPages === null || pageNumber >= numPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  );
}
