import { NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { DB } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function PATCH(
  req: Request,
  { params }: { params: { countryId: string } }
) {
  try {
    const session = await auth();
    const { countryId } = params;
    const { emoji, title, description, name, isNew } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const country = await DB.country.update({
      where: {
        id: countryId,
      },
      data: {
        emoji,
        name,
        title,
        description,
        isNew,
      },
    });
    revalidatePath('/country');
    return NextResponse.json(country);
  } catch (error) {
    console.log('[Country] Error: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { countryId: string } }
) {
  try {
    const session = await auth();
    const { countryId } = params;
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const country = await DB.country.delete({
      where: {
        id: countryId,
      },
      include: {
        jobs: true,
      },
    });
    revalidatePath('/country');
    return NextResponse.json(country);
  } catch (error) {
    console.log('[Country] Error: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
