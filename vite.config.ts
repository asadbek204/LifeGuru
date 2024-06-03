import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/test/',
  resolve: {
    alias: {
      '@components': "/src/components",
      '@contexts': "/src/contexts",
      '@pages': "/src/pages",
      '@types': '/src/types',
      "@assets": "/src/assets"
    },
  },
});