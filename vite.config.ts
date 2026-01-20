
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Đảm bảo process.env.API_KEY có sẵn cho client side trong production
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@google/genai'],
        },
      },
    },
  },
});
