'use client';

import { contracts } from '@/constants/contracts';
import { Fragment, useState } from 'react';
import { ContractCard } from './contract-card';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

// Dynamically import PdfViewer to avoid SSR issues
const PdfViewer = dynamic(() => import('./pdf-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="animate-pulse text-gray-500">Loading PDF viewer...</div>
    </div>
  ),
});

export default function ContractGrid() {
  const t = useTranslations('Contracts');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Fragment>
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold text-neutral-700">
              {t('title')}
            </h1>
            <p className="text-lg textGradient">{t('description')}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contracts.map((contract) => (
            <ContractCard
              key={contract.id}
              title={contract.title}
              country={contract.country}
              pdfSrc={contract.src}
              onClick={() => setSelected(contract.src)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl h-[98vh] sm:max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-gray-50">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {t('contractViewer')}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors group"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-3 sm:p-6">
              <PdfViewer file={selected} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
