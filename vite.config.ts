import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path' 
// to clear this error [node:path] install this pkg npm i -D @types/node 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react', 
      autoCodeSplitting: true 
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  //Syntax setting up VITE PROXY
  // server:{
  //   proxy:{
  //     '/api':{
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       // rewrite: ( path ) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
