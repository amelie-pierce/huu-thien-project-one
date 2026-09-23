import type { User } from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function signInRequest(email: string, _password: string): Promise<User> {
  await delay(600);
  return { id: `user-${email}`, email };
}

export async function signUpRequest(email: string, _password: string): Promise<User> {
  await delay(600);
  return { id: `user-${email}`, email };
}
