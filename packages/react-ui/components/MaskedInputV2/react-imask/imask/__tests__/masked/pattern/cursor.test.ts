import { MaskedPattern } from '../../../core/holder.js';
import { DIRECTION } from '../../../core/utils.js';

describe('Align LEFT', function () {
  const masked = new MaskedPattern({
    mask: '',
    lazy: false,
  });

  beforeEach(function () {
    masked.updateOptions({ mask: '', lazy: false });
    masked.unmaskedValue = '';
  });

  it('should align after XX', function () {
    ['XX*', 'XX[*]'].forEach((mask) => {
      masked.updateOptions({ mask });
      masked.value = '';

      expect(masked.nearestInputPos(0)).toBe(2);
      expect(masked.nearestInputPos(0, DIRECTION.LEFT)).toBe(0);

      expect(masked.nearestInputPos(1)).toBe(2);
      expect(masked.nearestInputPos(1, DIRECTION.LEFT)).toBe(0);

      expect(masked.nearestInputPos(2)).toBe(2);
      expect(masked.nearestInputPos(2, DIRECTION.LEFT)).toBe(2);

      expect(masked.nearestInputPos(3, DIRECTION.LEFT)).toBe(2);
    });
  });

  it('should align before XX with DIRECTION.LEFT', function () {
    ['XX*', 'XX[*]'].forEach((mask) => {
      masked.updateOptions({ mask, lazy: true });
      for (let pos = 0; pos < masked._blocks.length - 1; ++pos) {
        expect(masked.nearestInputPos(pos, DIRECTION.LEFT)).toBe(0);
      }
    });
  });

  it('should align before XX', function () {
    ['*XX', '[*]XX'].forEach((mask) => {
      masked.updateOptions({ mask });
      for (let pos = 0; pos < masked._blocks.length - 1; ++pos) {
        expect(masked.nearestInputPos(pos) <= 1).toBeTruthy();
      }
    });
  });

  it('should align before required', function () {
    masked.updateOptions({ mask: '[*]XX*' });
    expect(masked.nearestInputPos(masked.value.length, DIRECTION.LEFT)).toBe(2);

    masked.updateOptions({ mask: '*XX*' });
    expect(masked.nearestInputPos(masked.value.length, DIRECTION.LEFT)).toBe(0);
  });

  it('should align after filled', function () {
    masked.updateOptions({ mask: '**X*' });
    masked.unmaskedValue = 'a';
    expect(masked.nearestInputPos(1, DIRECTION.LEFT)).toBe(1);
    expect(masked.nearestInputPos(masked.value.length, DIRECTION.LEFT)).toBe(1);

    masked.unmaskedValue = 'aa';
    expect(masked.nearestInputPos(masked.value.length, DIRECTION.LEFT)).toBe(2);
    expect(masked.nearestInputPos(masked.value.length - 1, DIRECTION.LEFT)).toBe(2);
  });

  it('should align after filled and fixed with lazy', function () {
    masked.updateOptions({
      mask: '0X0',
      lazy: true,
    });

    masked.value = '1X';
    expect(masked.nearestInputPos(masked.value.length, DIRECTION.LEFT)).toBe(1);
  });

  it('should align at 0', function () {
    masked.updateOptions({
      mask: 'XX0',
      lazy: true,
    });

    masked.value = 'XX';
    expect(masked.nearestInputPos(1, DIRECTION.LEFT)).toBe(0);
  });

  it('should align after filled optional', function () {
    masked.updateOptions({
      mask: '[000]',
    });

    masked.value = '111';
    expect(masked.nearestInputPos(3, DIRECTION.LEFT)).toBe(3);
  });
});

describe('Align RIGHT', function () {
  const masked = new MaskedPattern({
    mask: '',
    lazy: false,
  });

  beforeEach(function () {
    masked.updateOptions({ mask: '', lazy: false });
    masked.unmaskedValue = '';
  });

  it('should align right inside block', function () {
    masked.updateOptions({
      mask: 'dw',
      lazy: false,
      blocks: {
        d: { mask: '00' },
        w: { mask: 'aa' },
      },
    });
    // set only chars
    masked.unmaskedValue = 'aa';
    expect(masked.nearestInputPos(1, DIRECTION.RIGHT)).toBe(2);
  });
});

describe('Align NONE', function () {
  const masked = new MaskedPattern({
    mask: '',
    lazy: false,
  });

  beforeEach(function () {
    masked.updateOptions({ mask: '', lazy: false });
    masked.unmaskedValue = '';
  });

  it('should align after filled', function () {
    masked.updateOptions({
      mask: '0.0',
    });

    masked.value = '1.1';
    expect(masked.nearestInputPos(1, DIRECTION.NONE)).toBe(1);
  });

  it('should align before input', function () {
    masked.updateOptions({
      mask: '0.0',
    });

    masked.value = '1.';
    expect(masked.nearestInputPos(2, DIRECTION.NONE)).toBe(2);
  });

  it('should align before last fixed', function () {
    masked.updateOptions({
      mask: '0.',
    });

    masked.value = '1.';
    expect(masked.nearestInputPos(2, DIRECTION.NONE)).toBe(1);
  });
});
