import { resolve } from 'path';
import { readFileSync } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const external = Object.keys(packageJson.peerDependencies || {});

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ useStrictCSP: true, relativeCSSInjection: false }),
    dts({
      entryRoot: '.',
      outDir: 'dist',
      include: ['index.ts', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.stories.tsx', '**/*.stories.ts', '__stories__', '__tests__', '__docs__'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'Table',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        if (external.some((dep) => id === dep || id.startsWith(`${dep}/`))) {
          return true;
        }
        if (id.startsWith('node:') || ['fs', 'path', 'url', 'util'].includes(id)) {
          return true;
        }
        return false;
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
});
