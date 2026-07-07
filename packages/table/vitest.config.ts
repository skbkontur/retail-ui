import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';

import {
  VITEST_SERVER_DEPS_INLINE,
  vitestCiJUnit,
  vitestReactJsxRuntimeAlias,
} from '../../scripts/test/vitest-shared.js';
import { vitestStubCssLess } from '../../scripts/test/vitest-stub-css-less.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = defineConfig({
  plugins: [vitestStubCssLess()],
  test: {
    name: 'table',
    pool: 'threads',
    globals: false,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    ...vitestCiJUnit('junit-table.xml'),
    server: {
      deps: {
        inline: [...VITEST_SERVER_DEPS_INLINE, '@skbkontur/react-ui'],
      },
    },
  },
  resolve: {
    alias: [
      vitestReactJsxRuntimeAlias(path.join(__dirname, '../..')),
      {
        find: '@skbkontur/react-ui/lib/size',
        replacement: path.join(__dirname, 'src/reactUiCompat/react-ui-size-stub.ts'),
      },
      {
        find: '@skbkontur/colors',
        replacement: path.join(__dirname, '../../packages/colors'),
      },
    ],
  },
});

// oxlint-disable-next-line import/no-default-export
export default config;
