import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import styles from './styles.module.css'

import { useControllableState } from 'hooks/useControllableState'
import { classes } from 'utils'

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface InputComponentProps extends InputProps {
  value?: string
  defaultValue?: string
  sizeVariant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onValueChange?: (value: string) => void
  Icon?: ReactNode
  label: string
}

const Input = forwardRef<HTMLInputElement, InputComponentProps>(function Checkbox(
  { value: valueProp, defaultValue, className, sizeVariant = 'md', onValueChange, Icon, label, ...inputProps },
  ref,
) {
  const [value = '', setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  return (
    <div
      className={classes(styles.container, className)}
      data-size={sizeVariant}
      data-placeholder-shown={!Boolean(value)}
    >
      {Icon ? <div className={styles.icon}>{Icon}</div> : null}

      <label className={styles.label}>
        <span className={styles.placeholder}>{label}</span>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          {...inputProps}
          ref={ref}
        />
      </label>
    </div>
  )
})

export { Input }
