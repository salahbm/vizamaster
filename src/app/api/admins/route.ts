import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { auth } from '../../../../auth';

// GET /api/admins - Get all admins
export async function GET(request: NextRequest) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await auth();
    if (!session?.user || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get all admins
    const admins = await DB.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { message: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

// POST /api/admins - Create a new admin
export async function POST(request: NextRequest) {
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
        { message: 'Only super admins can create new administrators' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, email, password, isAdmin } = body;

    // Check if the email is already in use
    const existingAdmin = await DB.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Email is already in use' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await DB.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { message: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
