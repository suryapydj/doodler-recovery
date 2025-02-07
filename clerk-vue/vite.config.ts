import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: [
      '24b40356-a00d-4a97-ad9b-fc6d249fb385-00-36bsdd8s97b2j.worf.replit.dev',
      "https://86b5879a-02e8-45dd-9c55-fe76a170d61b-00-2k9go8qunj825.kirk.replit.dev/",
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
