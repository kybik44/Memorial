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
        '/hooks': resolve(__dirname, 'src', 'hooks'),
        '/api': resolve(__dirname, 'src', 'api'),
        '/contexts': resolve(__dirname, 'src', 'contexts'),
        '/services': resolve(__dirname, 'src', 'services'),
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
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000',
      },
    },
  })
} 
