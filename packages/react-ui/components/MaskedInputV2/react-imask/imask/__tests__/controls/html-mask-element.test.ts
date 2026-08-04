import { HTMLInputMaskElement } from '../../controls/html-input-mask-element.js';

describe('HTMLMaskElement', function () {
  describe('#get isActive', function () {
    it('should use getRootNode if available', function () {
      const input = {
        getRootNode() {
          return this;
        },
        get activeElement() {
          return this;
        },
      } as any;

      const maskElement = new HTMLInputMaskElement(input);
      expect(maskElement.isActive).toBe(true);
    });

    it('should use document as a fallback', function () {
      const doc = global.document;

      const input = {} as any;
      global.document = { activeElement: input } as any;
      const maskElement = new HTMLInputMaskElement(input);
      expect(maskElement.isActive).toBe(true);

      global.document = doc;
    });
  });
});
