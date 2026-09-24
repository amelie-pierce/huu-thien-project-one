import { NextResponse } from 'next/server';
import { prisma } from '@/db/client';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      sizes: true,
      category: true,
    },
  });

  if (!product) {
    return NextResponse.json(
      {
        message: 'Product not found',
      },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}