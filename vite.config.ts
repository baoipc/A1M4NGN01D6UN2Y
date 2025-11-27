import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "A1M4NGN01D6UN2Y",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
