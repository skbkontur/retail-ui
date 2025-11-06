import { configure } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

configure({
  testIdAttribute: 'data-tid',
  reactStrictMode: process?.env?.STRICT_MODE === 'true',
});

vi.mock('lodash.debounce', () => ({
  default: vi.fn((fn) => {
    fn.cancel = vi.fn();
    return fn;
  }),
}));

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    findDOMNode: vi.fn(actual.findDOMNode as unknown as () => void),
  };
});

window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
});
