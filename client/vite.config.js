import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [
    tailwindcss(),
    glsl()
  ],
  server: {
    host: true,       
    port: 5173,      
  }
  ,
  base:"/skysolar"
})