import { redirect } from 'next/navigation'

export async function GET() {
  return redirect('/events/chozo-showcase')
}
