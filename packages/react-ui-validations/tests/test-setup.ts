import { configure } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

configure({
  testIdAttribute: 'data-tid',
  reactStrictMode: process?.env?.STRICT_MODE === 'true',
});

vi.mock('../src/smoothScrollIntoView', async () => {
  const actual = await vi.importActual('../src/smoothScrollIntoView');
  return {
    smoothScrollIntoView: vi.fn(actual.smoothScrollIntoView as unknown as () => void),
  };
});

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    findDOMNode: vi.fn(actual.findDOMNode as unknown as () => void),
  };
});
