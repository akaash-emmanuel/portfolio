import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Improve output for Netlify
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code from app code for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separate chunk for videos
          videos: []
        },
        // Use hashed filenames for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Ensure assets are processed correctly
    assetsInlineLimit: 4096,
    // Improve CSS extraction
    cssCodeSplit: true,
    // Generate source maps for better debugging
    sourcemap: true,
    // Minify output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true
      }
    }
  },
  // Optimize server options for development
  server: {
    host: true,
    port: 3000,
    open: true
  }
})
