import { VariantProps, cva } from 'class-variance-authority'
import styles from './badge.module.css'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  styles.base,
  {
    variants: {
      variant: {
        upcoming: styles.upcoming,
        early: styles.early,
        alpha: styles.alpha,
        beta: styles.beta,
      }
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ variant = 'upcoming', children, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }))} {...props}>
      {children}
    </div>
  )
}

export default Badge