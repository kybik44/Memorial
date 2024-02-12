import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';

export default ({ mode }) => {
  return defineConfig({
    resolve: {
      alias: {
        '/core': resolve(__dirname, 'src', 'core'),
        '/assets': resolve(__dirname, 'src', 'assets'),
        '/pages': resolve(__dirname, 'src', 'pages'),
        '/components': resolve(__dirname, 'src', 'components'),
        '/icons': resolve(__dirname, 'src', 'icons'),
        '/utils': resolve(__dirname, 'src', 'utils'),
        react: resolve(__dirname, 'node_modules/react')
      }
    },
    build: {
      rollupOptions: {
        treeshake: true,
        output: {
          dir: './dist/ui'
        },
      }
    },
    plugins: [
      react(),
      mode === 'production' && viteCompression()
    ],
  })
} 
