import styles from './button.module.css'

export const ButtonFileInput = ({ label = '', ...props }: any) => {
  return (
    <label className={styles.btn} htmlFor={props.id}>
      <input type="file" className={styles.input} {...props} />
      {label}
    </label>
  )
}
