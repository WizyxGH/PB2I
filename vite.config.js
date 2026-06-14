import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // Allow fetching local JSON files in dev
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main:          resolve(__dirname, 'index.html'),
        association:   resolve(__dirname, 'association.html'),
        actualites:    resolve(__dirname, 'actualites.html'),
        article:       resolve(__dirname, 'article.html'),
        contact:       resolve(__dirname, 'contact.html'),
        mecanographie: resolve(__dirname, 'collections/mecanographie.html'),
        imprimantes:   resolve(__dirname, 'collections/imprimantes.html'),
        magnetographie:resolve(__dirname, 'collections/magnetographie.html'),
        musee:         resolve(__dirname, 'collections/musee.html'),
      }
    }
  }
})
