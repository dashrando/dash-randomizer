export const isJsOrTsFile = (file: string) => (
  file.endsWith('.ts') || file.endsWith('.js')
)
