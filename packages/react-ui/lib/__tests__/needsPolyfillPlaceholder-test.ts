import { needsPolyfillPlaceholder, supportsPlaceholder } from '../needsPolyfillPlaceholder';
import { isIE11 } from '../client';

describe('needsPolyfillPlaceholder', () => {
  it('returns true if the browser is IE11', () => {
    if (isIE11) {
      expect(needsPolyfillPlaceholder).toEqual(true);
    }
  });

  it('returns true if browser does not support placeholder attribute', () => {
    if (!supportsPlaceholder) {
      expect(needsPolyfillPlaceholder).toEqual(true);
    }
  });

  it('returns false if browser supports placeholder attribute', () => {
    if (supportsPlaceholder && !isIE11) {
      expect(needsPolyfillPlaceholder).toEqual(false);
    }
  });
});
