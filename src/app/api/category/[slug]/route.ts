import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/db/client';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: slug,
        },
      },
    });

    if (!products.length) {
      return NextResponse.json(
        { message: 'No products found for this category.' },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error('Prisma Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
