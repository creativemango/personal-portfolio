import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://logiclane.site',
        changeOrigin: true,
        secure: false,
      },
      '/oauth2/authorization': {
        target: 'http://logiclane.site',
        changeOrigin: true,
        secure: false,
      },
      '/login/oauth2': {
        target: 'http://logiclane.site',
        changeOrigin: true,
        secure: false,
      },
      '/logout': {
        target: 'http://logiclane.site',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://logiclane.site',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
