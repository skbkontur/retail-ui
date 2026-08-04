import { MaskedPattern } from '../../../core/holder.js';
import { DIRECTION } from '../../../core/utils.js';

describe('Insert', function () {
  const masked = new MaskedPattern({
    mask: '',
    lazy: false,
  });

  beforeEach(function () {
    masked.updateOptions({ mask: '', lazy: false, eager: false });
    masked.unmaskedValue = '';
  });

  it('should skip empty and consider dot', function () {
    masked.updateOptions({ mask: '0{.}0' });
    masked.unmaskedValue = '.2';

    expect(masked.value).toBe('_.2');
  });

  it('should skip empty and not consider dot', function () {
    masked.updateOptions({ mask: '0.0' });
    masked.unmaskedValue = '.2';

    expect(masked.value).toBe('_._');
  });

  it('should skip in lazy mode', function () {
    ['0.0', '0{.}0'].forEach((mask) => {
      masked.updateOptions({ mask, lazy: true });
      masked.unmaskedValue = '.2';
      expect(masked.value).toBe('2');
      masked.value = '.2';
      expect(masked.value).toBe('2');
    });
  });

  it('should not skip empty', function () {
    ['0.0', '0{.}0'].forEach((mask) => {
      masked.updateOptions({ mask });
      masked.value = '.2';
      expect(masked.value).toBe('2._');
    });
  });

  it('should consider equal fixed and skip not equal fixed', function () {
    masked.updateOptions({ mask: '+{7}(000)000-00-00' });
    masked.value = '+79998887766';
    expect(masked.unmaskedValue).toBe('79998887766');
  });

  it('should prepare value before insert', function () {
    const prepareStub = vi.fn((v) => v);
    masked.updateOptions({
      mask: '+{7}(000)000-00-00',
      prepareChar: prepareStub,
    });
    const v = '+79998887766';
    masked.value = v;
    expect(prepareStub.mock.calls.length).toBe(v.length);
  });

  it('should insert value in the middle', function () {
    masked.updateOptions({
      mask: '000',
    });
    masked.splice(1, 0, '1', DIRECTION.NONE);
    expect(masked.value).toBe('_1_');
  });

  it('should not skip blocks', function () {
    masked.updateOptions({
      mask: 'dw',
      lazy: true,
      blocks: {
        d: {
          mask: '00',
        },
        w: {
          mask: 'aa',
        },
      },
    });
    // should not jump over numbers
    masked.value = 'a';
    expect(masked.value).toBe('');
  });

  describe('RAW', function () {
    it('should set insert flag on fixed', function () {
      masked.updateOptions({ mask: '+120' });
      masked.rawInputValue = '123';
      expect(masked.rawInputValue).toBe('123');

      masked.updateOptions({ mask: '{+12}0' });
      masked.rawInputValue = '123';
      expect(masked.rawInputValue).toBe('123');
    });

    it('should keep trailing fixed on update options', function () {
      masked.updateOptions({ mask: '0+' });
      masked.unmaskedValue = '11';
      expect(masked.value).toBe('1+');

      masked.updateOptions({ lazy: true });
      expect(masked.value).toBe('1+');
    });
  });

  describe('overwrite flag', function () {
    it('should shift value', function () {
      masked.updateOptions({ mask: '000', overwrite: 'shift' });
      masked.value = '123';
      expect(masked.value).toBe('123');

      masked.splice(0, 0, '0', DIRECTION.NONE);
      expect(masked.value).toBe('012');
    });

    it('should not shift if accepted', function () {
      masked.updateOptions({ mask: '00[aa]00', overwrite: 'shift' });
      masked.value = '1234';
      expect(masked.value).toBe('1234');

      masked.splice(2, 0, 'ab', DIRECTION.NONE);
      expect(masked.value).toBe('12ab34');
    });
  });

  describe('eager flag', function () {
    it('should correctly update value', function () {
      masked.updateOptions({
        mask: '+{3} 000',
        lazy: false,
        eager: true,
      });
      // eslint-disable-next-line no-self-assign
      masked.value = masked.value;
      expect(masked.value).toBe('+3 ___');
    });
  });

  describe('secure text entry', function () {
    it('should hide value', function () {
      masked.updateOptions({
        mask: 'XXX-XX-0000',
        definitions: {
          X: {
            mask: '0',
            displayChar: 'X',
            placeholderChar: '#',
          },
        },
      });
      masked.unmaskedValue = '123456789';

      expect(masked.value).toBe('123-45-6789');
      expect(masked.displayValue).toBe('XXX-XX-6789');
    });
  });

  describe('definitions', function () {
    it('should work', function () {
      masked.updateOptions({
        mask: '#00000',
        definitions: {
          '#': /[1-6]/,
        },
      });
      masked.unmaskedValue = '123456';

      expect(masked.unmaskedValue).toBe('123456');
      expect(masked.value).toBe('123456');
    });
  });
});
