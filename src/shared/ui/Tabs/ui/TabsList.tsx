import cn from 'classnames'
import { ComponentChildren } from 'preact'
import { useRef } from 'preact/hooks'

import { Button } from '@shared/ui/Button'
import { ArrowUp } from '@shared/ui/icons/ArrowUp'

import styles from './styles.module.scss'

interface Props {
  className?: string
  children: ComponentChildren
  arrows?: boolean
}

export const TabsList = ({ className, children, arrows }: Props) => {
  const tabsRef = useRef<HTMLDivElement>(null)

  const move = (direction: 'back' | 'forward') => () => {
    const tab = tabsRef.current
    if (!tab) return

    const delta = 100

    let movePosition = 0
    if (direction === 'back') {
      movePosition = tab.scrollLeft - delta

      if (movePosition < 0) movePosition = 0
    } else {
      movePosition = tab.scrollLeft + delta

      if (movePosition > tab.scrollWidth) movePosition = tab.scrollWidth
    }

    tab.scroll({ left: movePosition })
  }

  const tabListClass = cn({
    [styles.tablist]: true,
    [styles['tablist--with-arrows']]: arrows,
  })

  return (
    <div className={tabListClass}>
      {arrows && (
        <Button
          variant="secondary"
          className={styles['tablist__button-left']}
          onClick={move('back')}
          startIcon={<ArrowUp />}
          aria-label="Back"
        />
      )}

      <div
        ref={tabsRef}
        className={cn(styles.tablist__tabs, className ?? '')}
        tabIndex={-1}
        aria-orientation="vertical"
        role="tablist"
      >
        {children}
      </div>

      {arrows && (
        <Button
          variant="secondary"
          className={styles['tablist__button-right']}
          onClick={move('forward')}
          startIcon={<ArrowUp />}
          aria-label="Forward"
        />
      )}
    </div>
  )
}
