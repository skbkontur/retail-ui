import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const external = [...Object.keys(packageJson.peerDependencies || {}), '@skbkontur/global-object'];

// Ключ глобала с CSS пакета версионируем, чтобы несколько версий пакета на одной
// странице (микрофронты) не перезаписывали CSS друг друга. Тот же ключ
// прокидывается в deliverStyles через define ниже. Версию не санитайзим — ключ
// используется только через bracket-доступ и JSON.stringify, так что точки/дефисы
// безопасны, а инъективность сохраняется (beta.1 ≠ beta-1).
const tableCssGlobalKey = `__skbkonturTableCss_${String(packageJson.version)}`;

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    // Кладёт собранный CSS пакета строкой в globalThis при загрузке бандла;
    // deliverStyles читает его оттуда и адоптит через adoptedStyleSheets.
    // injectCode исполняется build-time: cssCode уже валидный JS-литерал строки.
    // Отдельный .css-ассет потребителю не отдаём — плагин извлекает CSS и инлайнит его.
    cssInjectedByJsPlugin({
      injectCode: (cssCode) => `globalThis[${JSON.stringify(tableCssGlobalKey)}] = ${cssCode};`,
      // append в конец чанка — основной код не сдвигается, sourcemap не ломается
      topExecutionPriority: false,
    }),
    dts({
      entryRoot: '.',
      outDir: 'dist',
      include: ['index.ts', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],
      exclude: ['**/*.stories.tsx', '**/*.stories.ts', '__stories__', '__tests__', '__docs__'],
      compilerOptions: {
        // Типчек table уже делает build:tsc. Без noCheck vite-plugin-dts тянет
        // workspace-source react-ui через paths и сыпет чужими TS2612/TS2339.
        noCheck: true,
      },
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
  // Прокидываем версионированный ключ глобала в deliverStyles (читает CSS оттуда).
  // Вне этой сборки (vitest/storybook) define не применяется — там используется
  // базовый fallback-ключ.
  define: {
    __SKBKONTUR_TABLE_CSS_GLOBAL_KEY__: JSON.stringify(tableCssGlobalKey),
  },
});
