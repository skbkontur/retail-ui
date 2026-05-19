import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/react';
import { vi } from 'vitest';

// Collected as a typed-as-unknown variable so that TypeScript does not apply
// excess-property checks against the installed @testing-library version.
// The matrix test setup swaps @testing-library/react across 12/15/16 and the
// Config type differs between majors (`reactStrictMode` is only in 13+, etc.).
const testingLibraryConfig: Record<string, unknown> = {
  testIdAttribute: 'data-tid',
};

// The default pipeline historically runs with an explicit `false`, but matrix
// jobs should omit the option completely unless strict mode is enabled.
if (process?.env?.STRICT_MODE === 'true') {
  testingLibraryConfig.reactStrictMode = true;
} else if (!process?.env?.REACT_VERSION) {
  testingLibraryConfig.reactStrictMode = false;
}
configure(testingLibraryConfig as Parameters<typeof configure>[0]);

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
