import preact from '@preact/preset-vite'
import { defineConfig, mergeConfig } from 'vite'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    plugins: [preact()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          popup: './popup.html',
        },
      },
    },
    server: {
      open: '/popup.html',
    },
  }),
)
