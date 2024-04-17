import { TResult } from '@shared/shared/libs/operationResult'

export interface ITabs {
  getActiveTab: () => Promise<TResult<TTab>>

  onActivated: {
    addListener: (callback: (tab: TResult<TTab>) => void) => void
  }
}

export type TTab = { id: number; url: string }
