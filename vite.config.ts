import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devApiPlugin } from './devApiPlugin';

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['lucide-react'],
        }
      }
    }
  }
});


