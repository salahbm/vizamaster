'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <div className=" overflow-y-scroll max-h-[450px] min-h-fit">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="min-h-fit"
      />
    </div>
  );
};
