import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Алиас для Storybook: `@skbkontur/table` → dist (CSS через adoptedStyleSheets).
 * Нельзя алиасить абсолютный путь к `index.ts` — Watchpack пытается scandir файл и падает ENOTDIR.
 * Требует предварительного `yarn build` пакета; stories/docs импортируют `@skbkontur/table`.
 */
export function getTableStorybookAliases(storybookConfigDir: string): Record<string, string> {
  const tableRoot = resolve(storybookConfigDir, '..');
  const tableDist = resolve(tableRoot, 'dist/index.js');

  if (!existsSync(tableDist)) {
    throw new Error(`[table storybook] не найден ${tableDist}. Сначала: yarn workspace @skbkontur/table build`);
  }

  return {
    '@skbkontur/table$': tableDist,
  };
}
