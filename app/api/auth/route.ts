import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { setSession, clearSession } from '@/lib/auth';

// Demo auth — in production swap for Clerk / Auth.js + Workers KV
const DEMO_PASSWORD = {
  'admin@marriageguide.in': 'admin123',
  'priya.iyer@example.com': 'member123',
  'arjun.sharma@example.com': 'member123',
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const expected = DEMO_PASSWORD[email as keyof typeof DEMO_PASSWORD];
  if (!expected || expected !== password) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const db = await getDb();
  const users = await db.listUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await setSession(user.id);
  return NextResponse.json({ ok: true, redirect: user.role === 'admin' ? '/admin' : '/', user });
}

export async function PUT(req: NextRequest) {
  // Demo register: just sign in as a member
  const { email } = await req.json();
  await setSession('u-2');
  return NextResponse.json({ ok: true, redirect: '/', email });
}

export async function DELETE() {
  await clearSession();
  return NextResponse.json({ ok: true });
}
