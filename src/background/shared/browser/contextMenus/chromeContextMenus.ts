import { IContextMenus } from './types'

export const chromeContextMenus: IContextMenus = {
  create: chrome.contextMenus.create,

  update: chrome.contextMenus.update,

  onClicked: chrome.contextMenus.onClicked,

  removeAll: chrome.contextMenus.removeAll,

  remove: chrome.contextMenus.remove,
}
