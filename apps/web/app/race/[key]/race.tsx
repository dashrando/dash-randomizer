import { kv } from '@vercel/kv'

type Spoiler = {
  'Area Transitions': {
    [transition: string]: string
  }
  Bosses: {
    [location: string]: string
  }
  Items: {
    [area: string]: {
      [location: string]: string
    }
  }
}

export type RaceSeedData = {
  hash: string
  key: string
  mystery: boolean
  spoiler: Spoiler
}

export const getRaceSeedData = async (key: string) => {
  const data = await kv.hgetall(`race-${key}`)
  if (data) {
    return data as RaceSeedData
  }
  return null
}