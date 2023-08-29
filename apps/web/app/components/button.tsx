import { VariantProps, cva } from 'class-variance-authority'
import styles from './button.module.css'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttonVariants = cva(
  styles.base,
  {
    variants: {
      variant: {
        hero: styles.hero,
        primary: styles.primary,
        secondary: styles.secondary,
        plain: styles.plain,
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
    VariantProps<typeof buttonVariants> {
      block?: boolean
    }

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
  block?: boolean
  href: string
}

export const ButtonFileInput = ({ label = '', ...props }: any) => {
  return (
    <label className={cn(buttonVariants({ variant: 'secondary', size: 'medium' }))} htmlFor={props.id}>
      <input type="file" className={styles.input} {...props} />
      {label}
    </label>
  )
}

export const Button = ({ variant = 'primary', size = 'medium', block = false, className = '', children, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), block && styles.block, className)} {...props}>
      {children}
    </button>
  )
}

export const ButtonLink = ({ href, variant = 'primary', size = 'medium', block = false, className = '', children, ...props }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(styles.buttonLink, buttonVariants({ variant, size }), block && styles.block, className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default Button
