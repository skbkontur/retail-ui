import { defineConfig } from 'vitest/config';

/** Свой конфиг: при `yarn test` из пакета cwd = packages/colors, корневой include `packages/**` тогда не находит тесты. */
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    name: 'colors',
    pool: 'threads',
    globals: false,
    environment: 'node',
    include: ['__tests__/**/*.{test,spec}.ts', 'snapshots.test.ts'],
  },
});
