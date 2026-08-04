import { createMask } from '../../core/holder.js';
import { maskedClass, normalizeOpts } from '../../masked/create.js';

describe('Masked Factory', function () {
  describe('#maskedClass', function () {
    it('should resolve class from string mask', function () {
      const masked = createMask({ mask: '0000' });
      const constructorClass = maskedClass('0000');
      const instanceClass = maskedClass(masked);

      expect(constructorClass).toBe(instanceClass);
    });
  });

  describe('#normalizeOpts', function () {
    it('should return masked clone', function () {
      const masked = createMask({ mask: '0000' });
      const opts = normalizeOpts(masked);

      expect(opts.mask).toBe(masked.constructor);
      expect(opts).not.toBe(masked);
    });
  });

  describe('#createMask', function () {
    it('should clone mask from masked', function () {
      const masked = createMask({ mask: '0000' });
      const cloneMasked = createMask({ mask: masked });

      expect(masked.mask).toBe(cloneMasked.mask);
      expect(masked).not.toBe(cloneMasked);
    });

    it('should update options from masked', function () {
      const mask = createMask({ mask: '0000' });

      expect(mask).toBe(createMask(mask));
      expect(mask).not.toBe(createMask({ mask }));
    });
  });
});
