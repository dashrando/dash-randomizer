import styles from './input.module.css'

export const InputWrapper = ({ children, ...props }: React.PropsWithChildren) => (
  <div className={styles.wrapper} {...props}>
    {children}
  </div>
)
