import { needsPolyfillPlaceholder } from '../needsPolyfillPlaceholder';
import { isIE11 } from '../client';

describe('needsPolyfillPlaceholder', () => {
  if (isIE11) {
    it('returns true if the browser is IE11', () => {
      expect(needsPolyfillPlaceholder()).toEqual(true);
    });
  } else if ('placeholder' in document.createElement('input')) {
    it('returns true if browser does not support placeholder attribute', () => {
      expect(needsPolyfillPlaceholder()).toEqual(true);
    });
  } else {
    it('returns false if browser supports placeholder attribute', () => {
      expect(needsPolyfillPlaceholder()).toEqual(true);
    });
  }
});
