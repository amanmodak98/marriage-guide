import { cookies } from 'next/headers';
import { seedUsers } from './data';
import type { User } from './types';

const COOKIE_NAME = 'mg_session';

export async function getSession(): Promise<User | null> {
  const c = cookies().get(COOKIE_NAME);
  if (!c) return null;
  const userId = c.value;
  return seedUsers.find((u) => u.id === userId) ?? null;
}

export async function requireAdmin(): Promise<User | null> {
  const u = await getSession();
  if (!u || u.role !== 'admin') return null;
  return u;
}

export async function setSession(userId: string) {
  cookies().set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  cookies().delete(COOKIE_NAME);
}
