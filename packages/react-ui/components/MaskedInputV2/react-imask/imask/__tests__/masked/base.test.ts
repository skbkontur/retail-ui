import { MaskedPattern } from '../../core/holder.js';
import { DIRECTION } from '../../core/utils.js';

describe('Masked', function () {
  describe('#eager is true', function () {
    it('should apply eager behaviour when true', function () {
      const masked = new MaskedPattern({
        eager: true,
        mask: '0.0',
      });

      masked.append('1', { input: true });
      expect(masked.value).toBe('1.');

      masked.splice(1, 1, '', DIRECTION.LEFT);
      expect(masked.value).toBe('');

      masked.append('12', { input: true });
      expect(masked.value).toBe('1.2');

      // Delete после "1" — удаляем точку (символ в позиции курсора), получаем "12"
      masked.splice(1, 1, '', DIRECTION.RIGHT);
      expect(masked.value).toBe('12');
    });

    it('should handle Delete (FORCE_RIGHT) when eager', function () {
      const masked = new MaskedPattern({
        eager: true,
        mask: '0.0',
      });
      masked.append('12', { input: true });
      expect(masked.value).toBe('1.2');
      // Delete после "1" — удаляем точку, остаётся "12"
      masked.splice(1, 1, '', DIRECTION.FORCE_RIGHT);
      expect(masked.value).toBe('12');
    });
  });

  describe('#eager with fixed', function () {
    it('should work with fixed part when eager', function () {
      const masked = new MaskedPattern({
        eager: true,
        lazy: true,
        mask: '{12}-0',
      });

      expect(masked.value).toBe('');
      masked.append('1', { input: true, raw: true });
      expect(masked.value).toBe('12-1');

      masked.updateOptions({ eager: false });
      masked.value = '';
      masked.append('1', { input: true });
      expect(masked.value).toBe('1');

      masked.updateOptions({ mask: '0-12-0', eager: true });
      masked.value = '';
      masked.append('11', { input: true, raw: true });
      expect(masked.value).toBe('1-12-1');

      masked.splice(5, 1, '', DIRECTION.FORCE_LEFT);
      expect(masked.value).toBe('1');
    });
  });

  describe('#eager is false', function () {
    it('should not eagerly format when false', function () {
      const masked = new MaskedPattern({
        mask: '0.0',
      });

      masked.append('1', { input: true });
      expect(masked.value).toBe('1');

      masked.splice(0, 1, '', DIRECTION.LEFT);
      expect(masked.value).toBe('');

      masked.append('12', { input: true });
      expect(masked.value).toBe('1.2');

      masked.splice(1, 1, '', DIRECTION.RIGHT);
      expect(masked.value).toBe('1.2');
    });
  });

  describe('#eager is "append"', function () {
    it('eager remove on backspace: после снятия литерала raw не меняется — цикл дожимает до изменения raw', function () {
      const masked = new MaskedPattern({
        eager: 'append',
        mask: '0.0',
      });

      masked.append('1', { input: true });
      expect(masked.value).toBe('1.');

      masked.splice(1, 1, '', DIRECTION.LEFT);
      expect(masked.value).toBe('');
    });
  });

  describe('#eager is "remove"', function () {
    it('should eagerly format only on remove', function () {
      const masked = new MaskedPattern({
        eager: 'remove',
        mask: '0.0',
      });

      masked.append('1', { input: true });
      expect(masked.value).toBe('1');

      masked.append('2', { input: true });
      expect(masked.value).toBe('1.2');

      masked.splice(2, 1, '', DIRECTION.LEFT);
      expect(masked.value).toBe('1');
    });
  });

  describe('#splice', function () {
    const masked = new MaskedPattern({
      mask: '+{7}(000)000-00-00',
    });

    it('should start insert from selection', function () {
      const v = '+7(111)222-33-44';
      masked.value = v;
      expect(masked.value).toBe(v);

      masked.splice(0, masked.value.length, v, DIRECTION.NONE, { input: true, raw: true });
      expect(masked.value).toBe(v);
    });

    it('should start insert from selection', function () {
      const v = '+7(111)222-33-44';
      masked.value = v;
      expect(masked.value).toBe(v);

      masked.splice(0, masked.value.length, v, DIRECTION.NONE, { input: true, raw: true });
      expect(masked.value).toBe(v);
    });
  });

  describe('#skipInvalid', function () {
    it('should skip invalid', function () {
      const masked = new MaskedPattern({ mask: '0000' });

      masked.value = '0a1.2 3';
      expect(masked.value).toBe('0123');
    });

    it('should not skip invalid', function () {
      const masked = new MaskedPattern({ mask: '0000', skipInvalid: false });

      masked.value = '0a1.2 3';
      expect(masked.value).toBe('0');
    });
  });
});
