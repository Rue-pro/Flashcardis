import { chromeContextMenus } from './chromeContextMenus'
import { IContextMenus } from './types'

export type {
  IContextMenus,
  TOnClickContextMenuInfoProps,
  TOnClickContextMenuTabProps,
} from './types'
export const contextMenus: IContextMenus = chromeContextMenus
