import '../../../scripts/test/vitest-setup-base';

if (typeof window !== 'undefined' && typeof window.getSelection !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).getSelection = () => ({
    toString: () => '',
  });
}
