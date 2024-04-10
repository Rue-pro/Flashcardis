import { defineConfig, mergeConfig } from 'vite'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    build: {
      outDir: 'dist/content/dictionary',
      rollupOptions: {
        input: {
          dictionary: './src/content/dictionary/index.ts',
        },
      },
    },
  }),
)
