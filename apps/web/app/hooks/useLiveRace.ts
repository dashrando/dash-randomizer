import useSWR from 'swr'
import useMounted from './useMounted'

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then(res => res.json())

export default function useLiveRace() {
  const mounted = useMounted()
  return useSWR(mounted ? '/events/vs-world/feed' : null, fetcher, {
    refreshInterval: 5000,
  })
}