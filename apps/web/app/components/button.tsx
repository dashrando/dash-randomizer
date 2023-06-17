import { VariantProps, cva } from 'class-variance-authority'
import styles from './button.module.css'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  styles.base,
  {
    variants: {
      variant: {
        primary: styles.primary,
        secondary: styles.secondary,
      },
      size: {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
      }
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const ButtonFileInput = ({ label = '', ...props }: any) => {
  return (
    <label className={cn(buttonVariants({ variant: 'secondary', size: 'medium' }))} htmlFor={props.id}>
      <input type="file" className={styles.input} {...props} />
      {label}
    </label>
  )
}

export const Button = ({ variant = 'primary', size = 'medium', children, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  )
}

export default Button
