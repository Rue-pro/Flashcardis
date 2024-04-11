export interface IConnectionProps {
  tabId: number
  connectInfo: { name: string }
}

interface IPort {
  name: string
  onMessage: <T>(callback: (msg: T) => void) => void
  postMessage: <T>(_msg: T) => void
  onDisconnect: (callback: () => void) => void
}

export type IPortEmitter = IPort
export type IPortReceiver = IPort
