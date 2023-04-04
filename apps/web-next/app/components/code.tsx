'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Code = ({ children }: { children: string }) => {
  return (
    <SyntaxHighlighter language="javascript" style={irBlack}>
      {children}
    </SyntaxHighlighter>
  )
}

export default Code
