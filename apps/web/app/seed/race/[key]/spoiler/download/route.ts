import { NextRequest, NextResponse } from "next/server";
import { kv } from '@vercel/kv'

export async function GET(req: NextRequest, { params }: { params: { key: string } }) {
  // TODO: Check for valid password via cookie

  const { key } = params
  const spoiler = await kv.hget<string>(`race-${key}`, 'spoiler')
  const res = new NextResponse(JSON.stringify(spoiler, null, 2))
  res.headers.append('Content-Disposition', `attachment; filename="DASH_race_${key}_spoiler.txt"`)
  res.headers.append('Content-Type', 'text/plain');
  return res;
}
