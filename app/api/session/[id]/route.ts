import { NextResponse } from 'next/server';

import { db } from '@/lib/firebaseAdmin';

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const { id } = await context.params;
  const dataSnap = await db.collection('shortLinkSessions').doc(id).get();
  return NextResponse.json({
    message: 'Hello from API!',
    id,
    status: dataSnap.exists ? 'confirmed' : 'pending',
  });
}
