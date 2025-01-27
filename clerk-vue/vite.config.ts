import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: [
      '24b40356-a00d-4a97-ad9b-fc6d249fb385-00-36bsdd8s97b2j.worf.replit.dev'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5173', 
        changeOrigin: true,
        secure: false,  
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
