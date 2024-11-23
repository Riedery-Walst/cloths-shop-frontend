import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/axiosInstance.js', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
    }
  }
})
