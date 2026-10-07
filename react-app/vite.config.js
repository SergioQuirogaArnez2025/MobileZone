import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages publica este proyecto bajo /MobileZone/.
  base: '/MobileZone/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.docs/**'],
    },
  },
})
