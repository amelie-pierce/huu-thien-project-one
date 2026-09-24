import { NextResponse } from 'next/server';
import { prisma } from '@/db/client';
export async function POST(request: Request) {
    
  const { email } = await request.json();

  const user = await prisma.user.create({
    data: {
      email,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: 'User Created!',
      data: user,
    },
    { status: 201 }
  );
}

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(
    {
      success: true,
      message: 'Users',
      data: users,
    },
    {
      status: 200,
    }
  );
}
