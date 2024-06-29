import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';
import { UTApi } from 'uploadthing/server';
import { revalidatePath } from 'next/cache';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(request: Request) {
  const data = await request.json();
  const utapi = new UTApi();
  await utapi.deleteFiles(data.url);
  revalidatePath('/vacancy');
  return Response.json({ message: 'ok' });
}
