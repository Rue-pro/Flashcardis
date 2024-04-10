import { IPortReceiver } from '../port/types'

export interface IRuntime {
  onConnect: {
    addListener: (callback: (port: IPortReceiver) => void) => void
  }
}
