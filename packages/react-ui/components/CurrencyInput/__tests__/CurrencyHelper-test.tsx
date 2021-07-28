import { CurrencyHelper } from '../CurrencyHelper';
import { isSafari } from '../../../lib/client';

describe('CurrencyHelper', () => {
  const space = isSafari ? '\u0020' : '\u2009';
  describe('unformatString', () => {
    [
      { value: ',', expected: '.' },
      { value: '.', expected: '.' },
      { value: '-12 345 678,90', expected: '-12345678.90' },
      { value: '−1', expected: '-1' }, // U+2212 Minus
      { value: '-1', expected: '-1' }, // U+002D Hyphen-minus
      { value: '﹣1', expected: '-1' }, // U+FE63 Small Hyphen-minus
      { value: '－1', expected: '-1' }, // U+FF0D Full-width Hyphen-minus
      { value: '‒1', expected: '-1' }, // U+2012 figure dash
      { value: '–1', expected: '-1' }, // U+2013 en dash
      { value: '—1', expected: '-1' }, // U+2014 em dash
      { value: '―1', expected: '-1' }, // U+2015 horizontal bar
    ].forEach((x) => {
      it(`unformatString('${x.value}') === ${x.expected}`, () => {
        const actual = CurrencyHelper.unformatString(x.value);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });
  describe('format', () => {
    [
      { value: 0, expected: '0' },
      { value: 1, expected: '1' },
      { value: 12, expected: '12' },
      { value: 123, expected: '123' },
      { value: 1234, expected: `1${space}234` },
      { value: 12345, expected: `12${space}345` },
      { value: 123456, expected: `123${space}456` },
      { value: 1234567, expected: `1${space}234${space}567` },
      { value: -0, expected: '0' },
      { value: -1, expected: '\u22121' },
      { value: -1234567, expected: `\u22121${space}234${space}567` },
    ].forEach((x) => {
      it(`format(${x.value}) === '${x.expected}'`, () => {
        const actual = CurrencyHelper.format(x.value);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: 1.0, expected: '1' },
      { value: 1.2, expected: '1,2' },
      { value: 1.0123, expected: '1,0123' },

      { value: 1, fractionDigits: 0, expected: '1' },
      { value: 1, fractionDigits: 1, expected: '1,0' },
      { value: 1, fractionDigits: 2, expected: '1,00' },
      { value: 1, fractionDigits: 4, expected: '1,0000' },

      { value: 1.2, fractionDigits: 1, expected: '1,2' },
      { value: 1.2, fractionDigits: 2, expected: '1,20' },
      { value: 1.2, fractionDigits: 4, expected: '1,2000' },

      { value: 1.02, fractionDigits: 2, expected: '1,02' },
      { value: 1.02, fractionDigits: 4, expected: '1,0200' },
    ].forEach((x) => {
      const options = { fractionDigits: x.fractionDigits };
      it(`format(${x.value}, ${JSON.stringify(options)}) === '${x.expected}'`, () => {
        const actual = CurrencyHelper.format(x.value, options);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: 1.1, fractionDigits: 0, expected: '1,1' },
      { value: 1.6789, fractionDigits: 3, expected: '1,6789' },
    ].forEach((x) => {
      const options = { fractionDigits: x.fractionDigits };

      it(`format(${x.value}, ${JSON.stringify(options)}) doesn't change value`, () => {
        expect(CurrencyHelper.format(x.value, options)).toBe(x.expected);
      });
    });
    [
      { value: 1.23, fractionDigits: 4.123, expected: '1,2300' },
      { value: 1.23, fractionDigits: 0.123, expected: '1,23' },
    ].forEach((x) => {
      it(`fraction part will not be used`, () => {
        expect(CurrencyHelper.format(x.value, { fractionDigits: x.fractionDigits })).toBe(x.expected);
      });
    });
  });
  describe('formatString', () => {
    [
      { value: '', expected: '' },
      { value: ',', expected: ',' },
      { value: '0', expected: '0' },
      { value: '1', expected: '1' },
      { value: '12', expected: '12' },
      { value: '123', expected: '123' },
      { value: '1234', expected: `1${space}234` },
      { value: '12345', expected: `12${space}345` },
      { value: '123456', expected: `123${space}456` },
      { value: '1234567', expected: `1${space}234${space}567` },
      { value: '-0', expected: '\u22120' },
      { value: '-1', expected: '\u22121' },
      { value: '-1234567', expected: `\u22121${space}234${space}567` },
    ].forEach((x) => {
      it(`formatString('${x.value}') === '${x.expected}'`, () => {
        const actual = CurrencyHelper.formatString(x.value);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: '\uFF0D', expected: '\u2212' },
      { value: '-', expected: '\u2212' },
      { value: '-.', expected: '\u2212,' },
      { value: '-.123', expected: '\u2212,123' },
      { value: '-00.0', expected: '\u221200,0' },

      { value: '', expected: '' },
      { value: '.', expected: ',' },
      { value: '0', expected: '0' },
      { value: '00', expected: '00' },
      { value: '00.', expected: '00,' },
      { value: '00,0', expected: '00,0' },

      { value: '', fractionDigits: 2, expected: ',00' },
      { value: '.', fractionDigits: 2, expected: ',00' },
      { value: '0', fractionDigits: 2, expected: '0,00' },
      { value: '00', fractionDigits: 2, expected: '00,00' },
      { value: '00.', fractionDigits: 2, expected: '00,00' },
      { value: '00,0', fractionDigits: 2, expected: '00,00' },

      { value: '1', fractionDigits: undefined, expected: '1' },
      { value: '1.', fractionDigits: undefined, expected: '1,' },
      { value: '1.0', fractionDigits: undefined, expected: '1,0' },
      { value: '1.2', fractionDigits: undefined, expected: '1,2' },
      { value: '1.0123', fractionDigits: undefined, expected: '1,0123' },

      { value: '1', fractionDigits: 0, expected: '1' },
      { value: '1', fractionDigits: 1, expected: '1,0' },
      { value: '1', fractionDigits: 2, expected: '1,00' },
      { value: '1', fractionDigits: 4, expected: '1,0000' },

      { value: '1.2', fractionDigits: 1, expected: '1,2' },
      { value: '1.2', fractionDigits: 2, expected: '1,20' },
      { value: '1.2', fractionDigits: 4, expected: '1,2000' },

      { value: '1.02', fractionDigits: 2, expected: '1,02' },
      { value: '1.02', fractionDigits: 4, expected: '1,0200' },
    ].forEach((x) => {
      const options = { fractionDigits: x.fractionDigits };
      it(`formatString('${x.value}', ${JSON.stringify(options)}) === '${x.expected}'`, () => {
        const actual = CurrencyHelper.formatString(x.value, options);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: '1,00', fractionDigits: 2, hideTrailingZeros: true, expected: '1,' },
      { value: '1,20', fractionDigits: 2, hideTrailingZeros: true, expected: '1,2' },
      { value: '100', fractionDigits: 2, hideTrailingZeros: true, expected: '100' },
      { value: '1,020300', fractionDigits: 10, hideTrailingZeros: true, expected: '1,0203' },
    ].forEach((x) => {
      const options = { fractionDigits: x.fractionDigits, hideTrailingZeros: x.hideTrailingZeros };
      it(`formatString('${x.value}', ${JSON.stringify(options)}) === '${x.expected}'`, () => {
        const actual = CurrencyHelper.formatString(x.value, options);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: '1.1', fractionDigits: 0, expected: '1,1' },
      { value: '1.6789', fractionDigits: 3, expected: '1,6789' },
    ].forEach((x) => {
      const options = { fractionDigits: x.fractionDigits };
      it(`formatString('${x.value}', ${JSON.stringify(options)}) doesn't change value`, () => {
        expect(CurrencyHelper.formatString(x.value, options)).toBe(x.expected);
      });
    });
    [
      { value: '1.23', fractionDigits: 4.123, expected: '1,2300' },
      { value: '1.23', fractionDigits: 0.123, expected: '1,23' },
    ].forEach((x) => {
      it(`fraction part will not be used`, () => {
        expect(CurrencyHelper.formatString(x.value, { fractionDigits: x.fractionDigits })).toBe(x.expected);
      });
    });
  });
  describe('parse', () => {
    [
      { value: ',', expected: 0 },
      { value: '.', expected: 0 },
      { value: '.0', expected: 0 },
      { value: '0.0', expected: 0 },
      { value: '12', expected: 12 },
      { value: '12.', expected: 12 },
      { value: ' 1 234 567 ', expected: 1234567 },
      { value: '0.01', expected: 0.01 },
      { value: '0,01', expected: 0.01 },
      { value: '0120.0340', expected: 120.034 },
      { value: '1.2 3 4', expected: 1.234 },
      { value: '1\n2', expected: 12 },
      { value: '-,', expected: -0 },
      { value: '-.', expected: -0 },
      { value: '-.0', expected: -0 },
      { value: '-0.0', expected: -0 },
      { value: '-.1', expected: -0.1 },
      { value: '-12', expected: -12 },
      { value: '\uFF0D1', expected: -1 },
      { value: '\u22121', expected: -1 },
    ].forEach((x) => {
      it(`parse('${x.value}') === ${x.expected}`, () => {
        const actual = CurrencyHelper.parse(x.value);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });
  describe('isValidString', () => {
    [
      { value: '1x', fractionDigits: null, expected: false },
      { value: '0123456789012345', expected: false },
      { value: '1234567890123450', expected: false },
      { value: '1234567890123456', expected: false },

      { value: '123456789012345', expected: true },
      { value: '.123456789012345', expected: true },
      { value: '1234567.89012345', expected: true },
      { value: '123456789012345.', expected: true },

      { value: '123456789012345', expected: true },
      { value: '123456789012345.', expected: true },
      { value: '1234567.89012345', expected: true },
      { value: '.123456789012345', expected: true },

      { value: '123456789012345', fractionDigits: 0, expected: true },
      { value: '123456789012345.', fractionDigits: 0, expected: false },
      { value: '1234567.89012345', fractionDigits: 0, expected: false },

      { value: '12345678901234', fractionDigits: 1, expected: true },
      { value: '12345678901234.', fractionDigits: 1, expected: true },
      { value: '12345678901234.5', fractionDigits: 1, expected: true },
      { value: '123456789012345', fractionDigits: 1, expected: false },
      { value: '123456789012345.', fractionDigits: 1, expected: false },
      { value: '1234567890123.45', fractionDigits: 1, expected: false },
      { value: '1234567.89012345', fractionDigits: 1, expected: false },

      { value: '12345678901', fractionDigits: 4, expected: true },
      { value: '12345678901.', fractionDigits: 4, expected: true },
      { value: '12345678901.23', fractionDigits: 4, expected: true },
      { value: '12345678901.2345', fractionDigits: 4, expected: true },
      { value: '123456789012', fractionDigits: 4, expected: false },
      { value: '123456789012.', fractionDigits: 4, expected: false },
      { value: '1234567890123.', fractionDigits: 4, expected: false },
      { value: '123456789012345', fractionDigits: 4, expected: false },
      { value: '123456789012345.', fractionDigits: 4, expected: false },
      { value: '12345678901234.5', fractionDigits: 4, expected: false },
      { value: '1234567890123.45', fractionDigits: 4, expected: false },
      { value: '1234567890.12345', fractionDigits: 4, expected: false },

      { value: '12345678901.000', fractionDigits: 4, expected: true },
      { value: '12345678901.0000', fractionDigits: 4, expected: true },
      { value: '1234567890.00000', fractionDigits: 4, expected: false },

      { value: '', expected: true },
      { value: '1', expected: true },
      { value: '.', expected: true },
      { value: ',', expected: true },
      { value: '.1', expected: true },
      { value: '1.', expected: true },
      { value: '..', expected: false },
      { value: '000.000', expected: true },
      { value: '1 234 567 890 123,45', expected: true },
      { value: '1 234 567 890 123,456', expected: false },
      { value: '0,123456789012345', fractionDigits: 15, expected: true },
      { value: '9,123456789012345', fractionDigits: 15, expected: false },
      { value: '-0,123456789012345', fractionDigits: 15, unsigned: true, expected: false },
      { value: '1 234 567 890 123,45', fractionDigits: 2, expected: true },
      { value: '-1 234 567 890 123,45', fractionDigits: 2, unsigned: true, expected: false },
      { value: '12 345 678 901 234,56', fractionDigits: 2, expected: false },

      { value: '', integerDigits: 0, expected: true },
      { value: '0,12', integerDigits: 0, expected: true },
      { value: '1,23', integerDigits: 0, expected: false },
      { value: '1,23', integerDigits: 1, expected: true },
      { value: '1,23', integerDigits: 2, expected: true },
      { value: '123,45', integerDigits: 2, expected: false },
    ].forEach((x) => {
      it(`parse('${x.value}', ${x.integerDigits}, ${x.fractionDigits}) === ${x.expected}`, () => {
        const actual = CurrencyHelper.isValidString(x.value, {
          integerDigits: x.integerDigits,
          fractionDigits: x.fractionDigits,
          unsigned: x.unsigned,
        });
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });
});
