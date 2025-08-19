import { NextResponse } from 'next/server';

import { db } from '@/lib/firebaseAdmin';

export async function GET() {
  const data = await db.collection('fcmDeviceTokens').get();
  return NextResponse.json({ message: 'Hello from API!' });
}

export async function POST(request: Request) {
  const { id, ...body } = await request.json();
  const docRef = await db.collection('shortLinkSessions').doc(id).set(body);
  return NextResponse.json({ message: 'Token added!' });
}
