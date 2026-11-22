import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Built site is served from https://shivendrasinghtanwar.github.io/jap-26/
// (dev server stays at the root so localhost:5180 keeps working)
export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: { port: 5180 },
  base: command === 'build' ? '/jap-26/' : '/',
}))
