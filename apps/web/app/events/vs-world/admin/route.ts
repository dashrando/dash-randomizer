import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const origin = new URL(req.nextUrl.origin)
  const redirect = `${origin}/events/vs-world`
  try {
    const cookieStore = cookies()
    const auth = req.nextUrl.searchParams.get('auth')
    if (auth) {
      cookieStore.set('dash-auth', auth)
    }
    return NextResponse.redirect(redirect)
  } catch (err) {
    return NextResponse.redirect('/events/vs-world')
  }
}
