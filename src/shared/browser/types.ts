import { TLanguageCode } from '@entities/language'

import type { TResult } from '@shared/libs/operationResult'

import { PortReceiver } from '.'

export interface IBrowser {
  storage: {
    local: {
      get: <Data>(key: string, defaultValue: Data) => Promise<TResult<Data>>

      set: <Data>(key: string, value: Data) => Promise<TResult<true>>

      onChanged: {
        addListener: <Data>(
          key: string,
          callback: (
            changes: TResult<{
              newValue: Data
              oldValue: Data
            }>,
          ) => void,
          defaultValue: Data,
        ) => (changes: {
          [key: string]: { newValue?: Data; oldValue?: Data }
        }) => void
        removeListener: <Data>(
          callback: (changes: {
            [key: string]: { newValue?: Data; oldValue?: Data }
          }) => void,
        ) => void
      }
    }
  }

  i18n: {
    getMessage: (key: string, substitutions?: string | string[]) => string

    detectLanguage: (text: string) => Promise<TLanguageCode>
  }

  runtime: {
    onConnect: {
      addListener: (callback: (port: PortReceiver) => void) => void
    }
  }

  tabs: {
    getActiveTab: () => Promise<TResult<TTab>>
  }

  contextMenus: {
    create: (menuConfig: IMenuConfig) => string | number

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
export type TTab = { id: number; url: string }
export type TActiveTabInfo = { tabId: number }
export type TOnChangeListenerProps<Value = unknown> = {
  [key: string]: {
    newValue?: Value
    oldValue?: Value
  }
}
