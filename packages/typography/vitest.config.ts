import { defineConfig } from 'vitest/config';

/** Свой конфиг: при `yarn test` из пакета cwd = packages/typography. */
// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    name: 'typography',
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./test-setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
  },
});
