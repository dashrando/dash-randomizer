import { format } from 'prettier'
import Modes from 'core/modes'
import { getSourceFile, getUrl } from '@/lib/github'
import descriptions from './recall'

function removeSyntax(input: string) {
  return input
    .replace(/const /g, '')
    .replace(/load/g, '')
    .replace(/return/g, '')
    // .replace(/\r\n/g, '')
    .replace(/;/g, '')
    .replace(/\}/g, '')
    .replace(/\{/g, '')
    .replace(/\./g, '')
    .replace(/>=/g, 'is greater than or equal to')
    .replace(/=>/g, "")
    .replace(/>/g, "is greater than")
    .replace(/&&/g, "AND")
    .replace(/\|\|/g, "OR")
    .replace(/=/g, "")
    .replace(/\(\)/g, "")
    .replace(/true/g, "Always Accessible")
    .replace(/major\(\"/g, "Major Item - ")
    .replace(/minor\(\"/g, "Minor Item - ")
    .replace(/\"/g, "")
    .replace(/\,/g, "")
    .trim()
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
  const source = await getSourceFile(mode.path)
  const baseUrl = getUrl(mode.path)
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
      code: fn,
      start,
      end,
      url: `${baseUrl}#L${start}-L${end}`,
      description,
      requirements: removeSyntax(fn.toString())
    }
  })
  return checks
}