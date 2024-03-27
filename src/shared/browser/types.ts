import type { TResult } from '@shared/libs/operationResult'

import { PortReceiver } from '.'

export interface IBrowser {
  storage: {
    local: {
      get: <Data>(key: string, defaultValue: Data) => Promise<TResult<Data>>

      set: <Data>(key: string, value: Data) => Promise<TResult<true>>

      onChanged: <Data>(
        key: string,
        callback: (
          changes: TResult<{
            newValue: Data
            oldValue: Data
          }>,
        ) => void,
        defaultValue: Data,
      ) => void
    }
  }

  i18n: {
    getMessage: (key: string, substitutions?: string | string[]) => string
  }

  runtime: {
    onConnect: {
      addListener: (callback: (port: PortReceiver) => void) => void
    }
  }

  tabs: {
    getActiveTab: () => Promise<TResult<ITab>>
  }
}

export type ITab = { id: number; url: string }
export type IActiveTabInfo = { tabId: number }
