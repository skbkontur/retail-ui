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
