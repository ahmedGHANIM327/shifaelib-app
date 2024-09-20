'use server';

import { NextResponse } from 'next/server';
import {
  createCabinet,
  deleteCabinet,
  getCabinet,
} from '@/server/services/cabinet';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const body = JSON.parse(JSON.stringify(payload));
    const response = await createCabinet(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'INTERNAL_SERVER_ERROR' });
  }
}

export async function GET() {
  try {
    const response = await getCabinet();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'INTERNAL_SERVER_ERROR' });
  }
}

export async function DELETE() {
  try {
    const response = await deleteCabinet();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ ok: false, error: JSON.stringify(error) });
  }
}
