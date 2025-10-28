import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    tailwindcss(),
    vue({
      compilerOptions: {
        customElement: true,
      },
    })],
  build: {
    manifest: true,
    rollupOptions: {
      input: ['./src/main.js', './index.html'],
    },
  }
})
