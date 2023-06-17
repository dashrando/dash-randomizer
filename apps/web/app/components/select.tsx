import { ChevronDown } from 'react-feather'
import styles from './select.module.css'

export type SelectOption = {
  label: string
  value: string
}

export type SelectProps = {
  options: SelectOption[],
  name?: string
  register?: any
  required?: boolean
}

const Select = ({
  options = [],
  name = '',
  register,
  required = false,

}: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.select}>
        <select id={`select-${name}`} name={name} {...register(name, { required })}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
