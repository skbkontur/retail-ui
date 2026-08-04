import { InputMask, type InputMaskElement } from '../../controls/input.js';
import { MaskElementStub } from './mask-element-stub.js';

describe('InputMask', function () {
  const imask = new InputMask(new MaskElementStub() as unknown as InputMaskElement, {
    mask: '',
  });

  beforeEach(function () {
    imask.mask = '';
    imask.unmaskedValue = '';
  });

  describe('#set mask', function () {
    it('should not set when null', function () {
      const oldMask = imask.mask;
      const oldMasked = imask.masked;

      imask.mask = null;
      expect(imask.mask).toBe(oldMask);
      expect(imask.masked).toBe(oldMasked);

      imask.mask = undefined;
      expect(imask.mask).toBe(oldMask);
      expect(imask.masked).toBe(oldMasked);
    });

    it('should not set when equal', function () {
      const oldMasked = imask.masked;

      imask.mask = '';
      expect(imask.masked).toBe(oldMasked);
    });

    it('should set new mask when class changes', function () {
      // Start with pattern mask, switch to regexp → new instance
      imask.mask = '' as any;
      const oldMasked = imask.masked;

      imask.mask = /regexp/ as any;
      expect(imask.masked).not.toBe(oldMasked);
    });

    it('should not recreate instance when mask of same type changes', function () {
      imask.mask = '0000' as any;
      const sameMasked = imask.masked;

      imask.mask = '0000' as any;
      expect(imask.masked).toBe(sameMasked);
    });
  });

  describe('#destroy', function () {
    it('clears el and _listeners, methods no-op without throwing', function () {
      const stub = new MaskElementStub() as unknown as InputMaskElement;
      const instance = new InputMask(stub, { mask: '0000' });

      expect(instance.el).toBe(stub);
      instance.destroy();

      expect(instance.el).toBeNull();
      expect(instance._listeners).toEqual({});
      expect(() => instance.updateControl()).not.toThrow();
      expect(instance.selectionStart).toBe(0);
      expect(instance.cursorPos).toBe(0);
    });
  });

  describe('_applyHistoryState (undo/redo)', function () {
    it('fires accept with truthy event so MaskedInput onValueChange is called on blur', function () {
      const input = document.createElement('input');
      document.body.appendChild(input);
      const mask = new InputMask(input, { mask: '0000' });

      const acceptEvents: unknown[] = [];
      mask.on('accept', (e?: InputEvent) => {
        acceptEvents.push(e);
      });

      mask.unmaskedValue = '1234';
      expect(mask.unmaskedValue).toBe('1234');

      const undoState = mask.history.undo();
      mask._applyHistoryState(undoState);

      expect(mask.unmaskedValue).toBe('');
      expect(acceptEvents.length).toBeGreaterThanOrEqual(1);
      expect(acceptEvents[acceptEvents.length - 1]).toBeTruthy();

      mask.destroy();
      document.body.removeChild(input);
    });
  });
});
