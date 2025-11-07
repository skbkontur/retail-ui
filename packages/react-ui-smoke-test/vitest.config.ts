/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

const isCI = process.env['GITLAB_CI'] !== undefined;

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.test.ts'],
    exclude: ['node_modules'],
    reporters: isCI ? ['default', 'junit'] : ['default'],
    outputFile: isCI ? './reports/report.xml' : undefined    
  },
});
