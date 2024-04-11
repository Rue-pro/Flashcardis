import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: [
        {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@background': resolve(__dirname, './src/background'),
      '@content': resolve(__dirname, './src/content'),
      '@popup': resolve(__dirname, './src/popup'),
      '@shared': resolve(__dirname, './src/shared'),
      '@tests': resolve(__dirname, './src/__tests__'),
    },
  },
})
