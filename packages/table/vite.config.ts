import { resolve } from 'path';
import { readFileSync } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

import { injectTableCssAtRuntime } from './build/injectTableCssAtRuntime';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const external = [...Object.keys(packageJson.peerDependencies || {}), '@skbkontur/global-object'];

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({
      useStrictCSP: true,
      relativeCSSInjection: false,
      styleId: 'skbkontur-table',
      injectCodeFunction: injectTableCssAtRuntime,
    }),
    dts({
      entryRoot: '.',
      outDir: 'dist',
      include: ['index.ts', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],
      exclude: ['**/*.stories.tsx', '**/*.stories.ts', '__stories__', '__tests__', '__docs__'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'Table',
      // ESM для Vite, CJS для Webpack/Node
      fileName: (format) => (format === 'es' ? 'index.js' : 'cjs/index.js'),
      formats: ['es', 'cjs'],
    },
    // Используем terser для сохранения комментария webpackIgnore
    minify: 'terser',
    terserOptions: {
      format: {
        // Сохраняем комментарии webpackIgnore для Webpack
        comments: (node, comment) => {
          return comment.value.includes('webpackIgnore');
        },
      },
      compress: {
        // Предотвращаем инлайнинг функции getSizeModulePath
        // чтобы путь оставался динамическим для Rollup/Vite
        pure_funcs: [],
      },
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
