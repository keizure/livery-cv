import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'src',
  publicDir: false,
  resolve: {
    alias: {
      '/data': path.resolve(__dirname, 'data')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
