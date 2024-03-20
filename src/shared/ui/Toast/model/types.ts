import { ComponentChildren } from 'preact'

export type TToastType = 'error' | 'info' | 'success'
export interface IToast {
  title: string
  message?: ComponentChildren
  details?: ComponentChildren
  id: string
  type: TToastType
}
