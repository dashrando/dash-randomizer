import type { NextRequest } from 'next/server'
import QRCode from 'qrcode'

export async function GET(req: NextRequest, { params }: { params: { seed: string }}) {
  const seedURL = new URL(req.nextUrl.href.replace('/qr', ''))
  const url = seedURL.href
  const svg = await QRCode.toString(url, { type: 'svg', margin: 0 })
  const headers = new Headers()
  headers.set('Content-Type', 'image/svg+xml')
  headers.set('X-Cache-Control', 's-maxage=86400')
  // Adding `?download` to the URL will cause the QR code to download
  const download = req.nextUrl.searchParams.has('download')
  if (download) {
    headers.set('Content-Disposition', `attachment; filename="dash-${params.seed}.svg"`)
  }
  return new Response(svg, {
    status: 200,
    headers,
  });
}