import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    federation({
      name: 'adminMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './AdminApp': './src/App.vue',
        './adminMenuConfig': './src/menuConfig.js'
      },
      shared: ['vue', 'vue-router', 'pinia']
    })
  ],
  server: {
    port: 5001,
    strictPort: true,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
