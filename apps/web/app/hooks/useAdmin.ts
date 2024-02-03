import useSWR from 'swr'
import useMounted from './useMounted'

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then(res => res.json())

const checkAdmin = (input: any) => {
  try {
    return !!input.admin
  } catch {
    return false
  }
}

export default function useAdmin() {
  const mounted = useMounted()
  const { data, ...hook } = useSWR(mounted ? '/events/vs-world/admin/auth' : null, fetcher)
  const isAdmin = checkAdmin(data)
  return { isAdmin, ...hook }
}
