import { ComponentChildren, createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

import { TTabValue } from '../model/types'

const TabsContext = createContext<{
  currentTab: TTabValue
  selectTab: (tab: TTabValue) => void
}>({
  currentTab: null,
  selectTab: () => {},
})

interface Props {
  children: ComponentChildren
  defaultValue?: TTabValue
  value?: TTabValue
  onChange?: (tab: TTabValue) => void
}

export const Tabs = ({ children, defaultValue, value, onChange }: Props) => {
  const [currentTab, setCurrentTab] = useState<TTabValue>(defaultValue ?? null)

  return (
    <TabsContext.Provider
      value={{
        currentTab: value ? value : currentTab,
        selectTab: value ? onChange ?? setCurrentTab : setCurrentTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export const useTabContext = () => useContext(TabsContext)
