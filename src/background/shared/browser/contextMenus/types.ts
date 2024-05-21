import { TTab } from '@shared/shared/browser/tabs'

export interface IContextMenus {
  create: (menuConfig: IMenuConfig) => string | number

  update: (
    menuItemId: string | number,
    menuConfig: Partial<IMenuConfig>,
  ) => void

  remove: (menuItemId: string | number) => void

  onClicked: {
    addListener: (
      callback: (
        info: TOnClickContextMenuInfoProps,
        tab?: Partial<TTab>,
      ) => Promise<void> | void,
    ) => void
  }

  removeAll: (callback: () => void) => void
}

type IMenuContextType =
  | 'all'
  | 'page'
  | 'frame'
  | 'selection'
  | 'link'
  | 'editable'
  | 'image'
  | 'video'
  | 'audio'
  | 'launcher'
  | 'browser_action'
  | 'page_action'
  | 'action'

type IMenuContextItemType = 'normal' | 'checkbox' | 'radio' | 'separator'
export interface IMenuConfig {
  title: string
  id: string
  contexts?: IMenuContextType[]
  parentId?: string
  type?: IMenuContextItemType
  documentUrlPatterns?: string[]
}
export type TOnClickContextMenuInfoProps = {
  menuItemId: string | number
  selectionText?: string
  pageUrl: string
}
export type TOnClickContextMenuTabProps = Partial<TTab>
