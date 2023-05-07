'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styles from './code.module.css'

const Code = ({ children }: { children: string }) => {
  return (
    <div className={styles.code}>
      <SyntaxHighlighter language="javascript" style={irBlack}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code
