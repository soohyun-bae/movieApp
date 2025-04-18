import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/movie': {
        target: 'http://localhost:5000/movie/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/movie/, ""),
      }
    }
  }
})
