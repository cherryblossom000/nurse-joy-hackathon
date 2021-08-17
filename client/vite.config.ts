import {defineConfig} from 'vite'
import {minifyHtml} from 'vite-plugin-html'
import sveltePreprocess from 'svelte-preprocess'
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({preprocess: sveltePreprocess()}), minifyHtml()],
  base: '',
  root: 'src',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: ['chrome92', 'safari14']
  }
})
