export interface IConnectionProps {
  tabId: number
  connectInfo: { name: string }
}

export interface IPort {
  name: string
  onMessage: <T>(callback: (msg: T) => void) => void
  postMessage: <T>(_msg: T) => void
  onDisconnect: (callback: () => void) => void
}
