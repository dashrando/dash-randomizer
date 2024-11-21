'use server'

import { kv } from '@vercel/kv'
import { customAlphabet } from 'nanoid'

export type SeedData = {
  hash: string
  key: string
  mystery: boolean
  spoiler: boolean
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

export const getNewSeedKey = async (): Promise<string> => {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)
  const newKey = nanoid()
  // This checks the KV database for a key collision. Currently disabled
  // because it doubles the requests of which we have a limit on free tier
  //const exists = await kv.exists(`seed-${newKey}`)
  //if (exists) {
    //return getNewSeedKey()
  //}
  return newKey
} 

export const saveSeedData = async (
  key: string,
  hash: string,
  mystery: boolean,
  race: boolean,
  spoiler: boolean
) => {
  const seedObj = {
    key,
    hash,
    mystery,
    race,
    spoiler
  }
  await kv.hset(`seed-${key}`, seedObj)
};