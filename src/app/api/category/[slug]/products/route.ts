import { NextResponse } from 'next/server';
import { prisma } from '@/db/client';

const PAGE_SIZE = 12;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { searchParams } = new URL(request.url);

  const page = Math.max(Number(searchParams.get('page')) || 1, 1);

  const category = await prisma.category.findUnique({
    where: { slug },
    select: { id: true, name: true },
  });

  if (!category) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  const where = {
    categoryId: category.id,
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        sizes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return NextResponse.json({
    products,
    categoryName: category.name,
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
      hasNextPage: page < Math.ceil(total / PAGE_SIZE),
      hasPreviousPage: page > 1,
    },
  });
}
