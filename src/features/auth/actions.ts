'use server';

import { createSession, deleteSession, getCurrentUser, signIn, signUp } from './auth.service';

import type { User } from './types';

export async function signInRequest(email: string, password: string): Promise<User> {
  const user = await signIn(email, password);
  await createSession(user.id);
  return user;
}

export async function signUpRequest(email: string, password: string): Promise<User> {
  const user = await signUp(email, password);
  await createSession(user.id);
  return user;
}

export async function signOutRequest() {
  await deleteSession();
}

export async function currentUserRequest(): Promise<User | null> {
  return getCurrentUser();
}
