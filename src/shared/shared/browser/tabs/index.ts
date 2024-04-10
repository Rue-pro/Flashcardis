import { chromeTabs } from './chromeTabs'
import { ITabs } from './types'

export type { ITabs, TTab } from './types'
export const tabs: ITabs = chromeTabs
