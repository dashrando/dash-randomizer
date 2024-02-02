import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export async function GET() {
  // const id = await get('live')
  const id = 1
  const active = id !== null
  return NextResponse.json({ id, active })
}

export const runtime = 'nodejs'