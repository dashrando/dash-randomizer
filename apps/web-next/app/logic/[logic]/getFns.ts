import { format } from 'prettier'
import Modes from 'core/modes'
import descriptions from './recall'

const getSourceCode = async (path: string) => {
  const branch = process.env.GIT_BRANCH;
  const repo = process.env.GIT_REPO;
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    }
  })
  return await response.text()
}

const getGithubUrl = (path: string) => {
  const branch = process.env.GIT_BRANCH;
  const repo = process.env.GIT_REPO;
  return `https://github.com/${repo}/blob/${branch}/${path}`
}

const findFn = (source: string, fnName: string) => {
  const lines = source.split('\n')
  const fnStart = lines.findIndex((line) => line.includes(`const ${fnName} = `))
  return fnStart + 1
}

const findFnEnd = (start: number, fn: string) => {
  const lines = fn.split('\n').filter((line) => line.length > 0)
  const lineCount = lines.length -1
  return start + lineCount
}

export const getFns = async () => {
  const modes = await Modes()
  const { recall: mode } = modes
  const source = await getSourceCode(mode.path)
  const baseUrl = getGithubUrl(mode.path)
  const keys = Object.keys(mode.checks) as string[]
  const checks = keys.map((key: string) => {
    const logicChecks = mode.checks as any
    const fn = logicChecks[key] as Function
    const prettyFn = format(fn.toString(), { parser: 'typescript' })
    const displayFn = `const ${key} = ${prettyFn}`
    const start = findFn(source, key)
    const end = findFnEnd(start, displayFn)
    const description = descriptions.get(key) || null
    return {
      key,
      fn: displayFn,
      start,
      end,
      url: `${baseUrl}#L${start}-L${end}`,
      description,
    }
  })
  return checks
}