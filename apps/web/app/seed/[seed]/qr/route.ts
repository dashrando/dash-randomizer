import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest) {
  return new Response('OK', {
    status: 200,
  });
}