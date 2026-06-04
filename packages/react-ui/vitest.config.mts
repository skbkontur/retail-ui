import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';

const isCI = process.env['GITLAB_CI'] !== undefined;
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
    include: ['scripts/**/*.test.ts', '**/__tests__/**/*test.(ts|tsx)', '**/__tests__/**/*.test.(ts|tsx)'],
    exclude: ['node_modules', '**/__stories__/**', '**/__creevey__/**'],
    reporters: isCI ? ['default', 'junit'] : ['default'],
    outputFile: isCI ? './reports/report.xml' : undefined,
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 30000,
    server: {
      deps: {
        // Inline @skbkontur/icons so Vite applies the `react/jsx-runtime`
        // alias below to its source imports.
        inline: [/@skbkontur\/icons/],
      },
    },
  },
  resolve: {
    alias: {
      // React 17 has no exports map, so @skbkontur/icons' bare
      // `react/jsx-runtime` import must point to the physical runtime file.
      'react/jsx-runtime': resolve(__dirname, '../../node_modules/react/jsx-runtime.js'),
    },
  },
});
