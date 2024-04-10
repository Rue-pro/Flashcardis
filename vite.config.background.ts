import { defineConfig, mergeConfig } from 'vite'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    build: {
      outDir: 'dist/background',
      rollupOptions: {
        input: {
          background: './src/background/app/index.ts',
        },
      },
    },
  }),
)
