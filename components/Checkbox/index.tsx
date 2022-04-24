import { ButtonHTMLAttributes, DetailedHTMLProps, Fragment, useRef } from 'react'
import { forwardRef, useEffect } from 'react'

import styles from './styles.module.css'

import { useControllableState } from 'hooks/useControllableState'
import { classes, composeEventHandlers } from 'utils'
import { CheckIcon } from 'components/icons'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

interface CheckboxProps extends ButtonProps {
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean
  onCheckedChange?: (checked: boolean) => void
  variant?: 'primary' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  {
    name,
    checked: checkedProp,
    defaultChecked,
    required,
    disabled,
    value = 'on',
    onCheckedChange,
    className,
    variant = 'dark',
    size = 'md',
    onKeyDown,
    onClick,
    ...checkboxProps
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  })

  useEffect(() => {
    if (!inputRef.current) return

    const input = inputRef.current
    const inputProto = window.HTMLInputElement.prototype
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked')

    if (!descriptor) return

    const setChecked = descriptor.set

    if (setChecked) {
      const event = new Event('click', { bubbles: true })
      setChecked.call(input, checked)
      input.dispatchEvent(event)
    }
  }, [checked])

  return (
    <Fragment>
      <button
        className={classes(styles.checkbox, className)}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        data-variant={variant}
        data-size={size}
        data-state={checked ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
        value={value}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          // don't toggle on enter
          if (event.key === 'Enter') event.preventDefault()
        })}
        onClick={composeEventHandlers(onClick, (event) => {
          event.stopPropagation()
          setChecked((checked) => !checked)
        })}
        {...checkboxProps}
        ref={ref}
      >
        <CheckIcon className={styles.checkbox__indicator} />
      </button>

      <input
        className={styles.input}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        required={required}
        disabled={disabled}
        aria-hidden
        tabIndex={-1}
        onChange={(event) => {
          setChecked(event.target.checked)
        }}
        style={{
          position: 'absolute',
          margin: 0,
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
          opacity: 0,
        }}
        ref={inputRef}
      />
    </Fragment>
  )
})

export { Checkbox }
