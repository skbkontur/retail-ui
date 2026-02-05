import { resolve } from 'path';

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
  resolve: {
    alias: {
      // Модуль @skbkontur/react-ui/lib/size доступен только в react-ui v6.0+.
      // Для react-ui v5.x подменяем на заглушку, чтобы динамический import() в
      // useSizeContext.ts не ломал тесты (catch блок обработает пустой экспорт).
      '@skbkontur/react-ui/lib/size': resolve(__dirname, 'src/reactUiCompat/react-ui-size-stub.ts'),
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default config;
