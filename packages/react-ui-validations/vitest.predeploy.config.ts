/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

const isCI = process.env['GITLAB_CI'] !== undefined;

export default defineConfig({
  test: {
    globals: true,
    include: ['scripts/check-pack-files.test.ts'],
    outputFile: isCI ? './reports/report.xml' : undefined,
  },
});
