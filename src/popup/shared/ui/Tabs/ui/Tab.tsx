import cn from 'classnames'
import { ComponentChildren } from 'preact'

import { TTabValue } from '../model/types'
import { useTabContext } from './Tabs'
import styles from './styles.module.scss'

interface Props {
  className?: string
  value: TTabValue
  disabled?: boolean
  children: ComponentChildren
  id: string
  'aria-controls': string
}

export const Tab = ({
  className,
  value,
  disabled,
  children,
  id,
  'aria-controls': ariaControls,
}: Props) => {
  const { currentTab, selectTab } = useTabContext()
  const selected = currentTab === value

  const tabClass = cn('h1', styles.tab, className ?? '')

  return (
    <button
      id={id}
      className={tabClass}
      tabIndex={selected ? 0 : -1}
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={() => selectTab(value)}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  )
}
