import '../../../scripts/test/vitest-setup-base';

if (typeof window !== 'undefined' && typeof window.getSelection !== 'function') {
  (window as any).getSelection = () => ({
    toString: () => '',
  });
}
