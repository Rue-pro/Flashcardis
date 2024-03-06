import { defineConfig, mergeConfig } from 'vite'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    build: {
      outDir: 'dist/content/ankiWeb',
      rollupOptions: {
        input: {
          ankiWeb: './src/app/content/ankiWeb/index.ts',
        },
      },
    },
  }),
)
