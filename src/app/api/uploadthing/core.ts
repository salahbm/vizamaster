import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { handleAdmin } from '@/hooks/admin/fetchAdmin';

const f = createUploadthing();

const handleAuth = async () => {
  const isAdmin = await handleAdmin();
  return { isAdmin };
};
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachments: f(['pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
