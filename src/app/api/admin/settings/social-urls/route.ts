import { NextResponse } from 'next/server';
import { DB } from '@/lib/db';

// GET handler to fetch all social media configurations for public access
export async function GET() {
  try {
    try {
      // Fetch all social media related configurations
      const configs = await DB.config.findMany({
        where: {
          key: {
            in: ['instagram_url', 'telegram_url'],
          },
        },
      });

      return NextResponse.json(configs);
    } catch (error) {
      // If the Config table doesn't exist yet, return an empty array
      const prismaError = error as { code?: string };
      if (prismaError.code === 'P2021') {
        console.warn('Config table does not exist yet, returning empty array');
        return NextResponse.json([]);
      }
      throw error; // Re-throw if it's a different error
    }
  } catch (error) {
    console.error('Error fetching social media configurations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
