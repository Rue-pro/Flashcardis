import preact from '@preact/preset-vite'
import { defineConfig, mergeConfig } from 'vite'
import circleDependency from 'vite-plugin-circular-dependency'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    plugins: [
      preact(),
      circleDependency({
        outputFilePath: './popup.circleDep.txt',
      }),
    ],
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
