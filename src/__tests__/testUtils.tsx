import { RenderOptions, render } from '@testing-library/preact'
import { ComponentChildren } from 'preact'

const AllTheProviders = ({ children }: { children: ComponentChildren }) => {
  return children
}

const customRender = (
  ui: ComponentChildren,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/preact'

// override render method
export { customRender as render }
