import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { key: string } }) {
  // TODO: Check for valid password via cookie
  // TODO: Download a plaintext vesion of the spoiler log

  return new NextResponse(JSON.stringify({ key: params.key }, null, 2));
}
