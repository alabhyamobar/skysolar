import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import glsl from "vite-plugin-glsl";

export default defineConfig({
  base: '/skysolar/',
  plugins: [
    tailwindcss(),
    glsl()
  ],
  optimizeDeps: {
    exclude:["sheryjs"]
  }
})