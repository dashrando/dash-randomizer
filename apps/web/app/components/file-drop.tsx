'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import styles from './file-drop.module.css'

const FileDrop = (props: React.PropsWithChildren) => {
  const [active, setActive] = useState(false)

  const onDragEnter = useCallback((evt: Event) => {
    evt.preventDefault()
    evt.stopPropagation()
    setActive(true)
  }, [])

  const onDragLeave = useCallback((evt: any) => {
    evt.preventDefault()
    evt.stopPropagation()
    setActive(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: useCallback((acceptedFiles: any) => {
      console.log('dropped files', acceptedFiles)
      setActive(false)
    }, [setActive]),
    onDragLeave,
  })

  useEffect(() => {
    window.addEventListener('dragenter', onDragEnter, false)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
    }
  }, [onDragEnter])

  if (!active) {
    return null
  }

  return (
    <div {...getRootProps()} className={styles.backdrop}>
      <input {...getInputProps()} />
      <p>Drop your file here</p>
    </div>
  )
}

export default FileDrop
