import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages publica el proyecto bajo /MobileZone/; Vite local usa la raíz.
  base: command === 'serve' ? '/' : '/MobileZone/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.docs/**'],
    },
  },
}))
