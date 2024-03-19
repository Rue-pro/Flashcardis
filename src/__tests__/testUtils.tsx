import {
  RenderOptions,
  renderHook as baseRenderHook,
  render,
} from '@testing-library/preact'
import { ComponentChildren } from 'preact'

import { ToastProvider } from '@shared/ui/Toast'

const AllTheProviders = ({ children }: { children: ComponentChildren }) => {
  return <ToastProvider>{children}</ToastProvider>
}

const customRender = (
  ui: ComponentChildren,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/preact'

export { customRender as render }

export const renderHook = <Result, Props>(
  hook: (initialProps: Props) => Result,
) => baseRenderHook(hook, { wrapper: AllTheProviders })

export const INVALID_JSON_STRING = `{"name": "Joe", "age": null]`
export const CIRCULAR_VALUE = { prop: 'value', circularRef: {} }
CIRCULAR_VALUE.circularRef = CIRCULAR_VALUE
