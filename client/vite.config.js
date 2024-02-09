import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { ImageLoader } from 'esbuild-vanilla-image-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      esbuildOptions: {
        plugins: [ImageLoader({dataUrl: false,})],
      }
    }),
  ],
  assetsInclude: ['**/*.png'],
  server: {
    port: 3000,
    // Target needs to target our API's address
    proxy: { 
      '/api': {
      target: 'http://localhost:5000', 
      changeOrigin: true, 
      secure: false
    }
  },
  }
})
