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
      }
    }
  }
)

export interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof buttonVariants> {}

export const ButtonFileInput = ({ label = '', ...props }: any) => {
  return (
    <label className={cn(buttonVariants({ variant: 'secondary' }))} htmlFor={props.id}>
      <input type="file" className={styles.input} {...props} />
      {label}
    </label>
  )
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }))}>{props.children}</button>
  )
}

export default Button
