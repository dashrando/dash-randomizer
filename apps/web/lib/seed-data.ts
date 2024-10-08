'use server'

import { kv } from '@vercel/kv'
import { customAlphabet } from 'nanoid'

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

export type SeedData = {
  hash: string
  key: string
  mystery: boolean
  spoiler: Spoiler
  race: boolean
}

export const getSeedData = async (key: string, legacyRace: boolean = false) => {
  const type = legacyRace ? 'race' : 'seed'
  const data = await kv.hgetall(`${type}-${key}`)
  if (data) {
    return data as SeedData
  }
  return null
}

export const saveSeedData = async (
  hash: string,
  mystery: boolean,
  race: boolean,
  spoiler: Spoiler | null
) => {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)
  const seedObj = {
    key: nanoid(),
    hash,
    mystery,
    race,
    spoiler
  }
  await kv.hset(`seed-${seedObj.key}`, seedObj)
  return seedObj.key
};