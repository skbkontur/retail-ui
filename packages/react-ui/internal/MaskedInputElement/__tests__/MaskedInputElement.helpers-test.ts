import { getCurrentValue } from '../MaskedInputElement.helpers';

describe('MaskedInputElement.helpers', () => {
  describe('getCurrentValue', () => {
    it.each([
      ['+7 (XXX) XXX-XX-XX', '+7 (', 'X'],
      ['+7 XXX XXX XX XX', '+7 ', 'X'],
      ['+7             ', '+7', ' '],
      ['__:__', '', '_'],
      [' : ', '', ''],
    ])('empty focused value with mask "%s" is "%s"', (emptyValue, focusedValue, maskChar) => {
      const [currentValue] = getCurrentValue({ emptyValue, originValue: '', value: '' }, true, maskChar);
      expect(currentValue).toBe(focusedValue);
    });

    it.each([
      ['', '', '+7 ___'],
      ['X', 'X', '+7 ___'],
      ['X', '', '+7 ___'],
      ['', 'X', '+7 ___'],
    ])('current unfocused value equals %s', (value, emptyValue, originValue) => {
      const [currentValue] = getCurrentValue({ emptyValue, originValue, value }, false, '_');
      expect(currentValue).toBe(value);
    });

    it.each([
      ['', '+7 (XXX) XXX-XX-XX', '+7 (XXX) XXX-XX-XX'],
      ['+7 (888) 888-88-88', '', '+7 (XXX) XXX-XX-XX'],
      ['+7 (777)', ' XXX-XX-XX', '+7 (XXX) XXX-XX-XX'],
      ['+7 (999) 999-99-', 'XX', '+7 (XXX) XXX-XX-XX'],
      ['+7 95', 'X XXX-XX-XX', '+7 XXX XXX-XX-XX'],
    ])('tail  for value `%s` is `%s`', (value, expectedTail, mask) => {
      const [, left, right] = getCurrentValue({ emptyValue: mask, originValue: value, value }, false, 'X');
      expect(left).toBe(value);
      expect(right).toBe(expectedTail);
    });

    it('tail for focused empty value`', () => {
      const [, left, right] = getCurrentValue(
        { emptyValue: '+7 (XXX) XXX-XX-XX', originValue: '', value: '' },
        true,
        'X',
      );
      expect(left).toBe('+7 (');
      expect(right).toBe('XXX) XXX-XX-XX');
    });

    it('tail for formatted value`', () => {
      const [, left, right] = getCurrentValue(
        { emptyValue: '+7 (XXX) XXX-XX-XX', originValue: '+7 (987) 65', value: '+798765' },
        true,
        'X',
      );
      expect(left).toBe('+7 (987) 65');
      expect(right).toBe('X-XX-XX');
    });
  });
});
