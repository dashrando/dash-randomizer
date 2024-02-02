import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('dash-auth')?.value as string|undefined
    const secret = process.env.ADMIN_SECRET
    const isAdmin = token && token === secret
    if (isAdmin) {
      return NextResponse.json({ admin: true })
    }
    throw new Error('Not Authenticated')
  } catch (err) {
    console.log(err)
    return NextResponse.json({ admin: false })
  }
}

export const dynamic = 'force-dynamic'
