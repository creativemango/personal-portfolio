import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 获取代理目标，默认为开发环境配置
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:8080'
  
  return {
    plugins: [react()],
    server: {
      port: 3001,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
        '/oauth2/authorization': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
        '/login/oauth2': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
        '/logout': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  }
})
