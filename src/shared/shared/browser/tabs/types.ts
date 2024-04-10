import { TResult } from '@shared/shared/libs/operationResult'

export interface ITabs {
  getActiveTab: () => Promise<TResult<TTab>>
}

export type TTab = { id: number; url: string }
