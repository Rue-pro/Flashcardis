import { ComponentChildren } from 'preact'

export type TAlertType = 'error' | 'info' | 'success'
export interface IAlert {
  title: string
  message?: ComponentChildren
  details?: Error | null
  type: TAlertType
}
