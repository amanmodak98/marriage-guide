import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = await getDb();
  const inquiries = await db.listInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }
    const db = await getDb();
    const inquiry = await db.createInquiry(body);
    return NextResponse.json(inquiry, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 400 });
  }
}
