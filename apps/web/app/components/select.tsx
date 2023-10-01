import { ChevronDown } from 'react-feather'
import styles from './select.module.css'

export type SelectOption = {
  label: string
  value: string | undefined
  hidden?: boolean
}

export type SelectProps = {
  options: SelectOption[],
  name?: string
  register?: any
  required?: boolean
  disabled?: boolean
}

const Select = ({
  options = [],
  name = '',
  register,
  required = false,
  disabled = false,

}: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.select}>
        <select id={`select-${name}`} disabled={disabled} name={name} {...register(name, { required })}>
          {options.map(({ value, label, hidden = false}) => (
            <option key={value} value={value} hidden={hidden}>
              {label}
            </option>
          ))}
        </select>
        <div className={styles.suffix}>
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  )
}

export default Select
