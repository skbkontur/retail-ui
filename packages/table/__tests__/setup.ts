import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';

configure({
  testIdAttribute: 'data-tid',
});

if (typeof window !== 'undefined' && typeof window.getSelection !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).getSelection = () => ({
    toString: () => '',
  });
}
