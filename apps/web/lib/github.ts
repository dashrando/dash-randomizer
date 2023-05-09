export const getSourceFile = async (path: string) => {
  const branch = process.env.GIT_BRANCH;
  const repo = process.env.GIT_REPO;
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
  const response = await fetch(url, {
    cache: 'force-cache'
  })
  return await response.text()
}

export const getUrl = (path: string) => {
  const branch = process.env.GIT_BRANCH;
  const repo = process.env.GIT_REPO;
  return `https://github.com/${repo}/blob/${branch}/${path}`
}
