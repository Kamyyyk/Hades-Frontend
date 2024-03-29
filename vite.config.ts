import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: [
         {find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url))},
         { find: '@public/', replacement: fileURLToPath(new URL('./public', import.meta.url)) }
      ]
   }
});
