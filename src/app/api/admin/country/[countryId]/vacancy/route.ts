import { DB } from '@/lib/db';

import { NextResponse } from 'next/server';
import { auth } from '../../../../../../../auth';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const {
      countryId,
      title,
      description,
      name,
      imgUrl,
      isActive,
      isNew,
      isTrend,
      isDeadline,
      countryName,
    } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!countryId) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const country = await DB.job.create({
      data: {
        countryId,
        title,
        description,
        name,
        imgUrl,
        isActive,
        isNew,
        isTrend,
        isDeadline,
        countryName,
      },
    });
    revalidatePath('/country');
    return NextResponse.json(country);
  } catch (error) {
    console.log('[Country] Error: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
