import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export async function GET() {
  const data = await get('vs-world')
  // @ts-ignore
  // const { id, overrideChannel } = data
  const id = 2
  const overrideChannel = null
  const active = id !== null
  return NextResponse.json({ id, overrideChannel, active })
}

export const runtime = 'nodejs'