import { NextRequest, NextResponse } from "next/server";
import { kv } from '@vercel/kv'

export async function GET(req: NextRequest, { params }: { params: { seed: string } }) {
  const { seed } = params
  const spoiler = await kv.hget<string>(`seed-${seed}`, 'spoiler')
  const res = new NextResponse(JSON.stringify(spoiler, null, 2))
  res.headers.append('Content-Disposition', `attachment; filename="DASH_seed_${seed}_spoiler.txt"`)
  res.headers.append('Content-Type', 'text/plain');
  return res;
}
