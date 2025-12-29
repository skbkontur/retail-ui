import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    server: {
      deps: {
        inline: ['@skbkontur/icons', '@skbkontur/global-object'],
      },
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default config;
