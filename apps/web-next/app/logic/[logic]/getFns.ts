import { format } from 'prettier'
import Modes from 'core/modes'

const getSourceCode = async (url: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    }
  })
  return await response.text()
}

const findFn = (source: string, fnName: string) => {
  const lines = source.split('\n')
  const fnStart = lines.findIndex((line) => line.includes(`const ${fnName} = `))
  return fnStart + 1
}

const findFnEnd = (start: number, fn: string, key: string) => {
  const lines = fn.split('\n').filter((line) => line.length > 0)
  const lineCount = lines.length -1
  return start + lineCount
}

export const getFns = async () => {
  const modes = await Modes()
  const { recall: mode } = modes
  const source = await getSourceCode(mode.source)
  // console.log('source', source.split('\n').length - 1)
  const keys = Object.keys(mode.checks) as string[]
  const checks = keys.map((key: string) => {
    const logicChecks = mode.checks as any
    const fn = logicChecks[key] as Function
    const prettyFn = format(fn.toString(), { parser: 'typescript' })
    const displayFn = `const ${key} = ${prettyFn}`
    const start = findFn(source, key)
    return {
      key,
      fn: displayFn,
      start,
      end: findFnEnd(start, displayFn, key),
    }
  })
  return checks
}