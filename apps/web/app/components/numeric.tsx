import styles from './numeric.module.css'

export type NumericProps = {
   minVal: number,
   maxVal: number,
   name?: string,
   register?: any,
   required?: boolean
   defaultValue?: number
}

const Numeric = ({
   minVal,
   maxVal,
   name = '',
   register,
   required = false,
   defaultValue = 1,
}: NumericProps) => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.numeric}>
            <input type="number"
               name={name} {...register(name, { required })}
               min={minVal}
               max={maxVal}
               defaultValue={defaultValue}
            />
         </div>
      </div>
   )
}

export default Numeric