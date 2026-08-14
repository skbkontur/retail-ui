import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, type Plugin } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '../..');
const isCI = process.env.CI !== undefined || process.env.GITLAB_CI !== undefined;

const vitestCssStubPrefix = '\0vitest-css-stub:';

/** Подмена импортов *.css / *.less (аналог identity-obj-proxy). */
function vitestStubCssLess(): Plugin {
  return {
    name: 'vitest-stub-css-less',
    enforce: 'pre',
    resolveId(source: string) {
      const base = source.split('?')[0].split('#')[0];
      if (/\.(css|less)$/.test(base)) {
        return vitestCssStubPrefix + base;
      }
    },
    load(id: string) {
      if (id.startsWith(vitestCssStubPrefix)) {
        return `const p = new Proxy(
          {},
          { get: (_t, prop) => (prop === '__esModule' ? false : String(prop)) }
        );
        export default p;`;
      }
    },
  };
}

/** Свой конфиг: при `yarn test` из пакета cwd = packages/table. */
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [vitestStubCssLess()],
  test: {
    name: 'table',
    pool: 'threads',
    globals: false,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
    reporters: isCI ? ['default', 'junit'] : ['default'],
    outputFile: isCI ? { junit: 'junit-table.xml' } : undefined,
    server: {
      deps: {
        // Inline icons / react-ui, чтобы Vite применил алиас `react/jsx-runtime`.
        inline: [/@skbkontur\/icons/, '@skbkontur/react-ui'],
      },
    },
  },
  resolve: {
    alias: [
      {
        // React без exports map: bare `react/jsx-runtime` → физический файл.
        find: 'react/jsx-runtime',
        replacement: path.join(repoRoot, 'node_modules/react/jsx-runtime.js'),
      },
      {
        find: '@skbkontur/react-ui/lib/size',
        replacement: path.join(__dirname, 'src/reactUiCompat/react-ui-size-stub.ts'),
      },
      // Source-exports react-ui: `./internal/*` → `*.ts`, а CommonWrapper — директория с index.
      {
        find: /^@skbkontur\/react-ui\/(.*)/,
        replacement: `${path.join(repoRoot, 'packages/react-ui').replace(/\\/g, '/')}/$1`,
      },
      {
        find: '@skbkontur/react-ui',
        replacement: path.join(repoRoot, 'packages/react-ui'),
      },
      {
        find: '@skbkontur/colors',
        replacement: path.join(repoRoot, 'packages/colors'),
      },
      {
        find: '@skbkontur/typography',
        replacement: path.join(repoRoot, 'packages/typography'),
      },
    ],
  },
});
