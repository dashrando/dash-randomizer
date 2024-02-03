export const PARTYKIT_URL = () => {
  const partyKitHost = process.env.NEXT_PUBLIC_PARTYKIT_HOST as string
  const partyKiProtocol = partyKitHost.includes('127.0.0.1') ? 'http' : 'https'
  return `${partyKiProtocol}://${partyKitHost}`
}

export const PartyKitFetch = async (room: string, body: object) => {
  const url = `/partykit/parties/main/${room}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return res.ok
}
