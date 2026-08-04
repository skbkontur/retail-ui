import { MaskedPattern } from '../../../core/holder.js';

describe('Extract', function () {
  const mask = new MaskedPattern({
    mask: '',
    lazy: false,
  });

  beforeEach(function () {
    mask.updateOptions({ mask: '', lazy: false });
    mask.unmaskedValue = '';
  });

  it('should reflect value and rawInputValue for optional block', function () {
    mask.updateOptions({ mask: '0{.}0', lazy: false });
    mask.unmaskedValue = '.2';

    expect(mask.value).toBe('_.2');
    expect(mask.displayValue).toBe('_.2');
    // rawInputValue — только введённые символы (без фиксированных), здесь "2"
    expect(mask.rawInputValue).toBe('2');
  });

  it('should extractInput in range', function () {
    mask.updateOptions({ mask: '0000', lazy: false });
    mask.unmaskedValue = '12';

    expect(mask.displayValue).toBe('12__');
    expect(mask.extractInput(0, 4)).toBe('12');
    expect(mask.extractInput(0, 2)).toBe('12');
    expect(mask.extractInput(2, 4)).toBe('');
  });

  it('should extractInput with bounds within displayValue length', function () {
    mask.updateOptions({ mask: '00-00', lazy: false });
    mask.unmaskedValue = '1234';

    expect(mask.displayValue).toBe('12-34');
    // extractInput без raw возвращает только символы ввода (без фиксированных)
    expect(mask.extractInput(0, 5)).toBe('1234');
    expect(mask.extractInput(0, 0)).toBe('');
    expect(mask.extractInput(3, 3)).toBe('');
    expect(mask.extractInput(1, 4)).toBe('23');
  });
});
