import { getSeedData } from '@/lib/seed-data'
import { getErrorImage, getSeedImage } from '@/app/seed/[seed]/opengraph-image'

export const runtime = 'nodejs'

export default async function Image({ params }: { params: { key: string } }) {
  const data = await getSeedData(params.key, true)
  if (!data) {
    return getErrorImage(params.key)
  }
  return await getSeedImage(data)
}
