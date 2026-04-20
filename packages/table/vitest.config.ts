import { resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';

import { vitestCiJUnit } from '../../scripts/test/vitest-shared.js';
import { vitestStubCssLess } from '../../scripts/test/vitest-stub-css-less.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
        inline: ['@skbkontur/icons', '@skbkontur/react-ui'],
      },
    },
  },
  resolve: {
    alias: {
      '@skbkontur/react-ui/lib/size': resolve(__dirname, 'src/reactUiCompat/react-ui-size-stub.ts'),
      '@skbkontur/colors': resolve(__dirname, '../../packages/colors'),
    },
  },
});

// oxlint-disable-next-line import/no-default-export
export default config;
