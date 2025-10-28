'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PdfControls } from './pdf-control';
import { ZoomControls } from './zoom-control';
import { Loader2 } from 'lucide-react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Use local worker file from public directory
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PdfViewerProps {
  file: string;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prev) =>
      direction === 'in' ? Math.min(prev + 0.2, 2.5) : Math.max(prev - 0.2, 0.5)
    );
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF document');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Zoom Controls - Top */}
      <div className="flex items-center gap-4 w-full justify-between px-4">
        <ZoomControls
          onZoomIn={() => handleZoom('in')}
          onZoomOut={() => handleZoom('out')}
          scale={scale}
        />
        {numPages && (
          <PdfControls
            pageNumber={pageNumber}
            numPages={numPages}
            onPrev={() => setPageNumber((p) => Math.max(p - 1, 1))}
            onNext={() => setPageNumber((p) => Math.min(p + 1, numPages))}
          />
        )}
      </div>

      {/* PDF Document */}
      <div className="relative w-full flex justify-center bg-gray-100 rounded-lg p-4 min-h-[500px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              <p className="text-sm text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
            <div className="text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-sm text-gray-500 mt-2">
                Please try again later
              </p>
            </div>
          </div>
        )}

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
          error=""
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
}
