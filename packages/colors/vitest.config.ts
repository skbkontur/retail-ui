import { defineConfig } from 'vitest/config';

import { vitestCiJUnit } from '../../scripts/test/vitest-shared.js';

/** Свой конфиг: при `yarn test` из пакета cwd = packages/colors, корневой include `packages/**` тогда не находит тесты. */
// eslint-disable-next-line import/no-default-export -- точка входа Vitest
export default defineConfig({
  test: {
    name: 'colors',
    pool: 'threads',
    globals: false,
    environment: 'node',
    include: ['__tests__/**/*.{test,spec}.ts', 'snapshots.test.ts'],
    ...vitestCiJUnit('junit-colors.xml'),
  },
});
