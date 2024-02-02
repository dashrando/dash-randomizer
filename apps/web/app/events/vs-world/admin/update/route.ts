import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { kv } from '@vercel/kv'
import { revalidatePath } from 'next/cache'

export type LiveTournamentKVData = {
  id: number
  overrideChannel: string | null
}

const getBody = async (req: Request) => {
  try {
    const body = await req.json()
    return body
  } catch(err) {
    return false
  }
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('dash-auth')?.value as string|undefined
  const secret = process.env.ADMIN_SECRET
  const isAdmin = token && token === secret
  if (!isAdmin) {
    throw new Error('Not Authenticated')
  }

  const payload = await getBody(req)
  if (payload) {
    const { id } = payload
    const currentData = await kv.get('vsworld') as LiveTournamentKVData
    const newData = { ...currentData, id }
    await kv.set('vsworld', newData)
  }
  
  // Purge cache
  await revalidatePath('/events/vs-world/feed')
  
  // TODO: broadcast change via websocket
  return NextResponse.json({ updated: new Date().toString() })
}
