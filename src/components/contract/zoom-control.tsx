'use client';

import { Plus, Minus } from 'lucide-react';

export function ZoomControls({
  onZoomIn,
  onZoomOut,
  scale,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  scale: number;
}) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1 border">
      <button
        onClick={onZoomOut}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Zoom out"
        disabled={scale <= 0.5}
      >
        <Minus className="w-4 h-4 text-gray-700" />
      </button>

      <div className="flex items-center gap-1 px-2 min-w-[80px] justify-center">
        <span className="text-sm font-medium text-gray-700">
          {Math.round(scale * 100)}%
        </span>
      </div>

      <button
        onClick={onZoomIn}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Zoom in"
        disabled={scale >= 2.5}
      >
        <Plus className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  );
}
