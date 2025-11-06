/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

const isCI = process.env['GITLAB_CI'] !== undefined;

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
  },
});
