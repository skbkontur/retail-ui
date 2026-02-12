import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
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

// eslint-disable-next-line import/no-default-export
export default config;
