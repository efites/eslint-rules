import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
  root: './app',
  build: {
    outDir: '../dist/app'
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/src')
    }
  }
})
