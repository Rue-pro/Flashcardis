import { TResult } from '@shared/shared/libs/operationResult'

export interface ITabs {
  _getActiveTabWithRetry: (
    onSuccess: (tab: TTab) => void,
    onError: () => void,
  ) => void

  getActiveTab: () => Promise<TResult<TTab>>

  onActivated: {
    addListener: (callback: (tab: TResult<TTab>) => void) => void
  }
}

export type TTab = { id: number; url: string }
