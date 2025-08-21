import { NextResponse } from 'next/server';

import { firestore } from '@/lib/firebaseAdmin';

export async function GET() {
  const data = await firestore.collection('fcmDeviceTokens').get();
  return NextResponse.json({ message: 'Hello from API!' });
}

export async function POST(request: Request) {
  const { id, ...body } = await request.json();
  const docRef = await firestore
    .collection('shortLinkSessions')
    .doc(id)
    .set(body);
  return NextResponse.json({ message: 'Token added!' });
}
