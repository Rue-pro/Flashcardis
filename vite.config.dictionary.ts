import { defineConfig, mergeConfig } from 'vite'
import circleDependency from 'vite-plugin-circular-dependency'

import commonViteConfig from './vite.config.common'

// https://vitejs.dev/config/
export default mergeConfig(
  commonViteConfig,
  defineConfig({
    plugins: [
      circleDependency({
        outputFilePath: './dictionary.circleDep.txt',
      }),
    ],
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
