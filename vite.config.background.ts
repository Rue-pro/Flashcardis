import { defineConfig, mergeConfig } from 'vite'
import circleDependency from 'vite-plugin-circular-dependency'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    plugins: [
      circleDependency({
        outputFilePath: './background.circleDep.txt',
      }),
    ],
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
