import cn from 'classnames'
import { JSXInternal } from 'node_modules/preact/src/jsx'
import { ComponentChild } from 'preact'

import styles from './styles.module.scss'

export type IButtonColors = 'accent' | 'success' | 'error' | 'info'

export interface Props extends JSXInternal.HTMLAttributes<HTMLButtonElement> {
  startIcon?: ComponentChild
  endIcon?: ComponentChild
  variant?: 'primary' | 'secondary'
  color?: IButtonColors
}

export const Button = ({
  children,
  startIcon,
  endIcon,
  variant = 'primary',
  color = 'accent',
  className,
  ...rest
}: Props) => {
  const buttonClass = cn(
    styles.button,
    styles[`button--variant-${variant}`],
    styles[`button--color-${color}`],
    className ?? '',
  )

  return (
    <button type="button" className={buttonClass} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
