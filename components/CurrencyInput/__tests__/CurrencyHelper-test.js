import CurrencyHelper from '../CurrencyHelper';

describe('CurrencyHelper', () => {
  describe('unformatString', () => {
    [
      { value: ',', expected: '.' },
      { value: '.', expected: '.' },
      { value: '-12 345 678,90', expected: '-12345678.90' },
      { value: '−1', expected: '-1' }, //U+2212 Minus
      { value: '-1', expected: '-1' }, //U+002D Hyphen-minus
      { value: '﹣1', expected: '-1' }, //U+FE63 Small Hyphen-minus
      { value: '－1', expected: '-1' }, //U+FF0D Full-width Hyphen-minus
      { value: '‒1', expected: '-1' }, //U+2012 figure dash
      { value: '–1', expected: '-1' }, //U+2013 en dash
      { value: '—1', expected: '-1' }, //U+2014 em dash
      { value: '―1', expected: '-1' } //U+2015 horizontal bar
    ].forEach(x => {
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
      { value: 1234, expected: '1\u2009234' },
      { value: 12345, expected: '12\u2009345' },
      { value: 123456, expected: '123\u2009456' },
      { value: 1234567, expected: '1\u2009234\u2009567' },
      { value: -0, expected: '0' },
      { value: -1, expected: '\u22121' },
      { value: -1234567, expected: '\u22121\u2009234\u2009567' }
    ].forEach(x => {
      it(`format(${x.value}) === '${x.expected}'`, () => {
        const actual = CurrencyHelper.format(x.value);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: 1.0, fractionDigits: undefined, expected: '1' },
      { value: 1.2, fractionDigits: undefined, expected: '1,2' },
      { value: 1.0123, fractionDigits: undefined, expected: '1,0123' },

      { value: 1, fractionDigits: 0, expected: '1' },
      { value: 1, fractionDigits: 1, expected: '1,0' },
      { value: 1, fractionDigits: 2, expected: '1,00' },
      { value: 1, fractionDigits: 4, expected: '1,0000' },

      { value: 1.2, fractionDigits: 1, expected: '1,2' },
      { value: 1.2, fractionDigits: 2, expected: '1,20' },
      { value: 1.2, fractionDigits: 4, expected: '1,2000' },

      { value: 1.02, fractionDigits: 2, expected: '1,02' },
      { value: 1.02, fractionDigits: 4, expected: '1,0200' }
    ].forEach(x => {
      const options = { fractionDigits: x.fractionDigits };
      it(`format(${x.value}, ${JSON.stringify(options)}) === '${
        x.expected
      }'`, () => {
        const actual = CurrencyHelper.format(x.value, options);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: 1.1, fractionDigits: 0 },
      { value: 1.6789, fractionDigits: 3 }
    ].forEach(x => {
      const options = { fractionDigits: x.fractionDigits };
      it(`format(${x.value}, ${JSON.stringify(options)}) throw`, () => {
        expect(() => CurrencyHelper.format(x.value, options)).toThrow();
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
      { value: '1234', expected: '1\u2009234' },
      { value: '12345', expected: '12\u2009345' },
      { value: '123456', expected: '123\u2009456' },
      { value: '1234567', expected: '1\u2009234\u2009567' },
      { value: '-0', expected: '\u22120' },
      { value: '-1', expected: '\u22121' },
      { value: '-1234567', expected: '\u22121\u2009234\u2009567' }
    ].forEach(x => {
      it(`formatString('${x.value}') === '${x.expected}'`, () => {
        const actual = CurrencyHelper.formatString(x.value);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: '\uFF0D', fractionDigits: undefined, expected: '\u2212' },
      { value: '-', fractionDigits: undefined, expected: '\u2212' },
      { value: '-.', fractionDigits: undefined, expected: '\u2212,' },
      { value: '-.123', fractionDigits: undefined, expected: '\u2212,123' },
      { value: '-00.0', fractionDigits: undefined, expected: '\u221200,0' },

      { value: '', fractionDigits: undefined, expected: '' },
      { value: '.', fractionDigits: undefined, expected: ',' },
      { value: '0', fractionDigits: undefined, expected: '0' },
      { value: '00', fractionDigits: undefined, expected: '00' },
      { value: '00.', fractionDigits: undefined, expected: '00,' },
      { value: '00,0', fractionDigits: undefined, expected: '00,0' },

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
      { value: '1.02', fractionDigits: 4, expected: '1,0200' }
    ].forEach(x => {
      const options = { fractionDigits: x.fractionDigits };
      it(`formatString('${x.value}', ${JSON.stringify(options)}) === '${
        x.expected
      }'`, () => {
        const actual = CurrencyHelper.formatString(x.value, options);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
    [
      { value: '1.1', fractionDigits: 0 },
      { value: '1.6789', fractionDigits: 3 }
    ].forEach(x => {
      const options = { fractionDigits: x.fractionDigits };
      it(`formatString('${x.value}', ${JSON.stringify(options)}) throw`, () => {
        expect(() => CurrencyHelper.format(x.value, options)).toThrow();
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
      { value: '\u22121', expected: -1 }
    ].forEach(x => {
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
      { value: '0123456789012345', fractionDigits: null, expected: false },
      { value: '1234567890123450', fractionDigits: null, expected: false },
      { value: '1234567890123456', fractionDigits: null, expected: false },

      { value: '123456789012345', fractionDigits: null, expected: true },
      { value: '.123456789012345', fractionDigits: null, expected: true },
      { value: '1234567.89012345', fractionDigits: null, expected: true },
      { value: '123456789012345.', fractionDigits: null, expected: true },

      { value: '123456789012345', fractionDigits: undefined, expected: true },
      { value: '123456789012345.', fractionDigits: undefined, expected: true },
      { value: '1234567.89012345', fractionDigits: undefined, expected: true },
      { value: '.123456789012345', fractionDigits: undefined, expected: true },

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

      { value: '', fractionDigits: null, expected: true },
      { value: '1', fractionDigits: null, expected: true },
      { value: '.', fractionDigits: null, expected: true },
      { value: ',', fractionDigits: null, expected: true },
      { value: '.1', fractionDigits: null, expected: true },
      { value: '1.', fractionDigits: null, expected: true },
      { value: '..', fractionDigits: null, expected: false },
      { value: '000.000', fractionDigits: null, expected: true },
      { value: '1 234 567 890 123,45', fractionDigits: null, expected: true },
      { value: '1 234 567 890 123,45', fractionDigits: 2, expected: true }
    ].forEach(x => {
      it(`parse('${x.value}', ${x.fractionDigits}) === ${x.expected}`, () => {
        const actual = CurrencyHelper.isValidString(x.value, x.fractionDigits);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });
});
