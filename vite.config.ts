import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://emis.dhis2.org/startracker',
        changeOrigin: true,
        secure: false,
        headers: {
          Authorization: 'Basic ' + btoa('dev_admin:Dev2023!'),
        },
      },
    },
  },
});
