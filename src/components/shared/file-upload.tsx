'use client';

import { ourFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from '../ui/use-toast';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: 'Error',
          description: `${error?.message}`,
          variant: 'destructive',
        });
      }}
      appearance={{
        button:
          'ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-r-none bg-secondary  after:bg-primary',
        label: 'text-secondary',
      }}
    />
  );
};

export default FileUpload;
