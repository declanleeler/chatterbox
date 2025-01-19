import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Default value for proxy target if not set in environment variables
const proxyTarget = process.env.VITE_PROXY_TARGET || '127.0.0.1';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: '/',
    proxy: {
      '/api': {
        target: `http://${proxyTarget}:8000`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
