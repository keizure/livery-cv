import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'src',
  publicDir: false,
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        viewer: path.resolve(__dirname, 'src/viewer.html')
      }
    }
  }
})
