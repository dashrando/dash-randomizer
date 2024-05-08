export async function GET({ params }: { params: { key: string } }) {
  // TODO: Check for valid password via cookie
  // TODO: Download a plaintext vesion of the spoiler log
  return {
    status: 200,
    headers: {},
    body: JSON.stringify({ key: params.key }),
  }
}
