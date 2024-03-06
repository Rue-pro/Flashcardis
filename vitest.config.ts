import { configDefaults, defineConfig } from 'vitest/config'

import commonViteConfig from './vite.config.common'

export default defineConfig({
  test: {
    setupFiles: ['./src/__tests__/setupTests.ts'],
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e'],
  },
  resolve: commonViteConfig.resolve,
})
