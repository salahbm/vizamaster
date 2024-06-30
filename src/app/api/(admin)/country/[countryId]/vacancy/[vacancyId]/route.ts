import { NextResponse } from 'next/server';
import { auth } from '../../../../../../../../auth';
import { DB } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function PATCH(
  req: Request,
  { params }: { params: { vacancyId: string } }
) {
  try {
    const session = await auth();
    const { vacancyId } = params;
    const {
      name,
      title,
      description,
      isNew,
      imgUrl,
      countryName,
      countryId,
      isTrend,
      isDeadline,
      isActive,
    } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const job = await DB.job.update({
      where: {
        id: vacancyId,
      },
      data: {
        name,
        title,
        description,
        isNew,
        imgUrl,
        countryName,
        countryId,
        isTrend,
        isDeadline,
        isActive,
      },
    });
    revalidatePath('/posts');
    return NextResponse.json(job);
  } catch (error) {
    console.log('[job] Error: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { vacancyId: string } }
) {
  try {
    const session = await auth();
    const { vacancyId } = params;
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const job = await DB.job.delete({
      where: {
        id: vacancyId,
      },
    });
    revalidatePath('/posts');
    return NextResponse.json(job);
  } catch (error) {
    console.log('[job] Error: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
