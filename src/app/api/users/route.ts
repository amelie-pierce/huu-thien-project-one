import { getUsers, signUp } from '@/features/auth/auth.service';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'Email and password are required' },
      { status: 400 }
    );
  }

  try {
    const user = await signUp(email, password);
    return NextResponse.json(
      {
        success: true,
        message: 'User Created!',
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    const duplicate = error instanceof Error && error.message === 'Email already registered';
    return NextResponse.json(
      { success: false, message: duplicate ? error.message : 'Internal Server Error' },
      { status: duplicate ? 409 : 500 }
    );
  }
}

export async function GET() {
  const users = await getUsers();

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
