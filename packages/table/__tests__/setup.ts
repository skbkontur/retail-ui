import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

configure({ testIdAttribute: 'data-tid' });

process.env.NODE_ENV = 'test';

afterEach(() => {
  cleanup();
});

globalThis.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

if (typeof window !== 'undefined' && typeof window.getSelection !== 'function') {
  // jsdom не всегда даёт getSelection — нужен для выделения текста в таблице.
  (window as Window & { getSelection: () => { toString: () => string } }).getSelection = () => ({
    toString: () => '',
  });
}
