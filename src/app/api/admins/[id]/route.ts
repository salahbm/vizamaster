import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/lib/db';
import { auth } from '../../../../../auth';

// GET /api/admins/[id] - Get a specific admin
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the user is authenticated
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the admin
    const admin = await DB.admin.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    return NextResponse.json(
      { message: 'Failed to fetch admin' },
      { status: 500 }
    );
  }
}

// PATCH /api/admins/[id] - Update an admin
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
      select: { isAdmin: true },
    });

    if (!currentAdmin?.isAdmin) {
      return NextResponse.json(
        { message: 'Only super admins can update administrators' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, email } = body;

    // Check if the admin exists
    const admin = await DB.admin.findUnique({
      where: { id: params.id },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    // Check if the email is already in use by another admin
    if (email && email !== admin.email) {
      const existingAdmin = await DB.admin.findUnique({
        where: { email },
      });

      if (existingAdmin && existingAdmin.id !== params.id) {
        return NextResponse.json(
          { message: 'Email is already in use' },
          { status: 400 }
        );
      }
    }

    // Update the admin
    const updatedAdmin = await DB.admin.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? name : undefined,
        email: email !== undefined ? email : undefined,
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
    console.error('Error updating admin:', error);
    return NextResponse.json(
      { message: 'Failed to update admin' },
      { status: 500 }
    );
  }
}

// DELETE /api/admins/[id] - Delete an admin
export async function DELETE(
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
        { message: 'Only super admins can delete administrators' },
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (currentAdmin.id === params.id) {
      return NextResponse.json(
        { message: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check if the admin exists
    const admin = await DB.admin.findUnique({
      where: { id: params.id },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    // Delete the admin
    await DB.admin.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Admin deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { message: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
