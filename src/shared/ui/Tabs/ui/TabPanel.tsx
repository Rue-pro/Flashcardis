import cn from 'classnames'
import { ComponentChildren } from 'preact'

import { TTabValue } from '../model/types'
import { useTabContext } from './Tabs'
import styles from './styles.module.scss'

interface Props {
  className?: string
  children: ComponentChildren
  value: TTabValue
  'aria-labelledby': string
  'aria-controls': string
}

export const TabPanel = ({
  className,
  children,
  value,
  'aria-labelledby': ariaLabelledBy,
  'aria-controls': ariaControls,
}: Props) => {
  const { currentTab } = useTabContext()
  const selected = currentTab === value

  const tabPanelClass = cn({
    [styles.tabpanel]: true,
    [styles['tabpanel--active']]: selected,
    [className ?? '']: !!className,
  })

  return (
    <div
      className={tabPanelClass}
      id={ariaControls}
      role="tabpanel"
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </div>
  )
}
