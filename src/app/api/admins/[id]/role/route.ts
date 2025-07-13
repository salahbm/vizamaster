import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/lib/db';
import { auth } from '../../../../../../auth';

// PATCH /api/admins/[id]/role - Update an admin's role (super admin status)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the user is authenticated and is a super admin
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if the current user is a super admin
    const currentAdmin = await DB.admin.findUnique({
      where: { email: session.user.email as string },
      select: { id: true, isAdmin: true },
    });

    if (!currentAdmin?.isAdmin) {
      return NextResponse.json(
        { message: 'Only super admins can update admin roles' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { isAdmin } = body;

    // Check if the admin exists
    const admin = await DB.admin.findUnique({
      where: { id: params.id },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    // Prevent self-demotion
    if (currentAdmin.id === params.id && isAdmin === false) {
      return NextResponse.json(
        { message: 'You cannot remove your own super admin status' },
        { status: 400 }
      );
    }

    // Update the admin's role
    const updatedAdmin = await DB.admin.update({
      where: { id: params.id },
      data: {
        isAdmin,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin role:', error);
    return NextResponse.json(
      { message: 'Failed to update admin role' },
      { status: 500 }
    );
  }
}
