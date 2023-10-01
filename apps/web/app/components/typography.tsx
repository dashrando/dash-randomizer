import { VariantProps, cva } from 'class-variance-authority'
import styles from './typography.module.css'
import { cn } from '@/lib/utils'

const textVariants = cva(
  styles.base,
  {
    variants: {
      size: {
        medium: styles.size_medium,
        large: styles.size_large,
        small: styles.size_small,
        compact: styles.size_compact,
        xlarge: styles.size_xlarge,
      },
      weight: {
        bold: styles.weight_bold,
        default: styles.weight_default,
      },
      family: {
        mono: styles.family_mono,
        default: styles.family_default,
      }
    },
    defaultVariants: {
      size: "medium",
      weight: "default",
      family: "default",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {}

export default function Text({
  size = 'medium',
  weight = 'default',
  family = 'default',
  className = '',
  ...props
}: any) {
  const El = props.el || 'p'
  return (<El className={cn(textVariants({ size, weight, family, className }))}>{props.children}</El>)
}
