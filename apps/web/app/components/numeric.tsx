import styles from './numeric.module.css'

export type NumericProps = {
   minVal: number,
   maxVal: number,
   name?: string,
   register?: any,
   required?: boolean
}

const Numeric = ({
   minVal,
   maxVal,
   name = '',
   register,
   required = false,
}: NumericProps) => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.numeric}>
            <input type="number"
                   name={name} {...register(name, { required })}
                   min={minVal}
                   max={maxVal}>
            </input>
         </div>
      </div>
   )
}

export default Numeric