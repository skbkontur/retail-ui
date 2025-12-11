/// <reference types="vitest" />
import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

const isCI = process.env['GITLAB_CI'] !== undefined;

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/test-setup.ts'],
    include: ['tests/**/*test.(ts|tsx)'],
    exclude: ['node_modules'],
    reporters: isCI ? ['junit', 'default'] : ['default'],
    outputFile: isCI ? './reports/report.xml' : undefined,
  },
  resolve: {
    alias: [
      {
        find: '@skbkontur/react-ui',
        replacement: resolve(__dirname, '../react-ui'),
      },
    ],
  },
});
