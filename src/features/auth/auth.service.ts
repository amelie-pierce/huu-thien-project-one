import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

import type { User } from './types';
import { cookies } from 'next/headers';
import { prisma } from '@/db/client';

const publicUser = { id: true, email: true } as const;
const SESSION_COOKIE = 'session';
const SESSION_TTL = 30 * 24 * 60 * 60 * 1000;

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  return timingSafeEqual(Buffer.from(hash, 'hex'), scryptSync(password, salt, 64));
}

const normalize = (email: string) => email.trim().toLowerCase();

export async function signIn(email: string, password: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email: normalize(email) } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error('Invalid email or password');
  }
  return { id: user.id, email: user.email };
}

export async function signUp(email: string, password: string): Promise<User> {
  const exists = await prisma.user.findUnique({ where: { email: normalize(email) } });
  if (exists) throw new Error('Email already registered');

  return prisma.user.create({
    data: { email: normalize(email), passwordHash: hashPassword(password) },
    select: publicUser,
  });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany({ select: publicUser });
}

export async function createSession(userId: string) {
  const id = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL);
  await prisma.session.create({ data: { id, userId, expiresAt } });

  (await cookies()).set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const id = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!id) return null;

  const session = await prisma.session.findUnique({
    where: { id },
    include: { user: { select: publicUser } },
  });
  if (!session || session.expiresAt < new Date()) return null;

  return session.user;
}

export async function deleteSession() {
  const store = await cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  if (id) await prisma.session.deleteMany({ where: { id } });
  store.delete(SESSION_COOKIE);
}
