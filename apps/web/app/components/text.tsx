import Typograhy from './typography'
import { cn } from '@/lib/utils'
import styles from './text.module.css'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string,
  props?: any
}

export const Body = ({ className = '', ...props }: TextProps) => { 
  const classes = cn(styles.body, className)
  return (
    <Typograhy el="p" size="medium" className={classes} {...props} />
  )
}

export const Caption = ({ className = '', ...props }: TextProps) => { 
  const classes = cn(styles.caption, className)
  return (
    <Typograhy el="p" size="small" className={classes} {...props} />
  )
}

export const Headline = (props: any) => {
  return (
    <Typograhy el="h1" size="xlarge" weight="bold" {...props} />
  )
}

export const Heading = ({ el = 'h2', size = 'large', ...props }: any) => {
  return (
    <Typograhy el={el} size={size} weight="bold" {...props} />
  )
}

export default Body
