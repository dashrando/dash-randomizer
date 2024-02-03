const getEnv = () => {
  try {
    return {
      vercelEnv: process.env.NEXT_PUBLIC_VERCEL_ENV,
      branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
    }
  } catch(err) {
    console.error(err)
    return {}
  }
}

export default getEnv

export const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? '127.0.0.1:1999'
