import { NextResponse } from 'next/server';
import { prisma } from '@/db/client';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Prisma Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
