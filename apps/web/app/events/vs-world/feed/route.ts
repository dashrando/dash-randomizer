import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export type LiveTournamentKVData = {
  id: number
  overrideChannel: string | null
}

export async function GET() {
  const data = await kv.get('vsworld') as LiveTournamentKVData
  // const data = {
  //   id: 1,
  //   overrideChannel: null
  // }
  const { id, overrideChannel } = data
  const active = id !== null
  return NextResponse.json({ id, overrideChannel, active })
}

export const runtime = 'nodejs'