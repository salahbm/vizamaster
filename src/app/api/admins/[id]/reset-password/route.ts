import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { auth } from '../../../../../../auth';

// POST /api/admins/[id]/reset-password - Reset an admin's password
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the user is authenticated and is a super admin
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' });
    }

    // Check if the current user is a super admin
    const currentAdmin = await DB.admin.findUnique({
      where: { email: session.user.email as string },
      select: { isAdmin: true },
    });

    if (!currentAdmin?.isAdmin) {
      return NextResponse.json(
        { message: 'Only super admins can reset passwords' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { password } = body;

    if (!password || password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
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

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin's password and clear any reset tokens
    await DB.admin.update({
      where: { id: params.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { message: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
