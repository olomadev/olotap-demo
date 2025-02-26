import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  transpileDependencies: ["vuetify"],
  plugins: [
    vue({ 
      template: { 
        transformAssetUrls
      }
    }),
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 
    'process.env': {},
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  }
})
