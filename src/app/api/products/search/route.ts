import { NextResponse, type NextRequest } from 'next/server';
import { searchProducts } from '@/features/catalog/catalog.service';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? '';

  try {
    const products = await searchProducts(query.slice(0, 100));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Prisma Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
