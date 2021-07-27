import { CurrencyInputHelper } from '../CurrencyInputHelper';

describe('CurrencyInputHelper', () => {
  describe('insert', () => {
    [
      {
        value: '',
        start: -1,
        end: 0,
        input: '',
        expected: { value: '', position: 0 },
      },
      {
        value: '',
        start: 0,
        end: 1,
        input: '',
        expected: { value: '', position: 0 },
      },
      {
        value: '',
        start: -1,
        end: 0,
        input: '8',
        expected: { value: '8', position: 1 },
      },
      {
        value: '',
        start: 0,
        end: 1,
        input: '8',
        expected: { value: '8', position: 1 },
      },
      {
        value: '',
        start: 0,
        end: 0,
        input: '1',
        expected: { value: '1', position: 1 },
      },
      {
        value: '8',
        start: 0,
        end: 0,
        input: '1',
        expected: { value: '18', position: 1 },
      },
      {
        value: '8',
        start: 1,
        end: 1,
        input: '1',
        expected: { value: '81', position: 2 },
      },
      {
        value: '8',
        start: 0,
        end: 1,
        input: '1',
        expected: { value: '1', position: 1 },
      },
      {
        value: '88',
        start: 0,
        end: 1,
        input: '1',
        expected: { value: '18', position: 1 },
      },
      {
        value: '88',
        start: 1,
        end: 1,
        input: '1',
        expected: { value: '818', position: 2 },
      },
      {
        value: '88',
        start: 1,
        end: 2,
        input: '1',
        expected: { value: '81', position: 2 },
      },
      {
        value: '888',
        start: 1,
        end: 2,
        input: '1',
        expected: { value: '818', position: 2 },
      },

      {
        value: '888 888',
        start: 3,
        end: 3,
        input: '1',
        expected: { value: '8\u0020881\u0020888', position: 6 },
      },
      {
        value: '888 888',
        start: 4,
        end: 4,
        input: '1',
        expected: { value: '8\u0020881\u0020888', position: 6 },
      },
      {
        value: '888 888',
        start: 3,
        end: 4,
        input: '1',
        expected: { value: '8\u0020881\u0020888', position: 6 },
      },
      {
        value: '888 888',
        start: 2,
        end: 5,
        input: '1',
        expected: { value: '88\u0020188', position: 4 },
      },
      {
        value: '888 888',
        start: 2,
        end: 5,
        input: '11',
        expected: { value: '881\u0020188', position: 5 },
      },
      {
        value: '888 888',
        start: 3,
        end: 4,
        input: '',
        expected: { value: '888\u0020888', position: 4 },
      },
      {
        value: '888 888',
        start: 2,
        end: 4,
        input: '',
        expected: { value: '88\u0020888', position: 3 },
      },
      {
        value: '888 888',
        start: 2,
        end: 3,
        input: '',
        expected: { value: '88\u0020888', position: 3 },
      },
      {
        value: '888 888',
        start: 4,
        end: 5,
        input: '',
        expected: { value: '88\u0020888', position: 4 },
      },
      {
        value: '8 888',
        start: 0,
        end: 2,
        input: '',
        expected: { value: '888', position: 0 },
      },
    ].forEach((x) => {
      it(`insert('${x.value}', ${x.start}, ${x.end}, '${x.input}') === {'${x.expected.value}' : ${x.expected.position}}`, () => {
        const actual = CurrencyInputHelper.insert(x.value, x.start, x.end, x.input);
        const expected = x.expected;
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('safeInsert', () => {
    [
      {
        value: '12',
        start: 2,
        end: 2,
        input: 'a',
        expected: null,
      },
      {
        value: '23 123 123 123 123',
        start: 0,
        end: 0,
        input: '1',
        fractionDigits: null,
        unsigned: false,
        integerDigits: null,
        expected: { value: '123\u0020123\u0020123\u0020123\u0020123', position: 1 },
      },
      {
        value: '123 123 123 123 123',
        start: 0,
        end: 0,
        input: '3',
        fractionDigits: null,
        unsigned: false,
        integerDigits: null,
        expected: null,
      },
      {
        value: '23 123 123 123,123',
        start: 0,
        end: 0,
        input: '1',
        fractionDigits: null,
        unsigned: false,
        integerDigits: null,
        expected: { value: '123\u0020123\u0020123\u0020123,123', position: 1 },
      },
      {
        value: '123 123 123 123,123',
        start: 0,
        end: 0,
        input: '3',
        fractionDigits: null,
        unsigned: false,
        integerDigits: null,
        expected: null,
      },
      {
        value: '0,12',
        start: 4,
        end: 4,
        input: '3',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: null,
        expected: null,
      },
      {
        value: '0,123',
        start: 5,
        end: 5,
        input: '',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: null,
        expected: null,
      },
      {
        value: '0,123',
        start: 4,
        end: 5,
        input: '4',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: null,
        expected: null,
      },
      {
        value: '3,21',
        start: 0,
        end: 0,
        input: '4',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: 2,
        expected: { value: '43,21', position: 1 },
      },
      {
        value: '43,21',
        start: 0,
        end: 0,
        input: '5',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: 2,
        expected: null,
      },
      {
        value: '43,21',
        start: 0,
        end: 2,
        input: '0',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: 0,
        expected: { value: '0,21', position: 1 },
      },
      {
        value: '43,21',
        start: 0,
        end: 0,
        input: '-',
        fractionDigits: 2,
        unsigned: true,
        integerDigits: 2,
        expected: null,
      },
      {
        value: '43,21',
        start: 0,
        end: 0,
        input: '-',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: 2,
        expected: { value: '\u221243,21', position: 1 },
      },
      {
        value: '43,21',
        start: 0,
        end: 0,
        input: '\u2212',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: 2,
        expected: { value: '\u221243,21', position: 1 },
      },
      {
        value: '\u221299,2',
        start: 5,
        end: 5,
        input: '1',
        fractionDigits: 2,
        unsigned: false,
        integerDigits: 2,
        expected: { value: '\u221299,21', position: 6 },
      },
    ].forEach((x) => {
      it(`safeInsert('${x.value}', ${x.start}, ${x.end}, '${x.input}', ${x.fractionDigits}, ${x.unsigned}, ${
        x.integerDigits
      }) => ${JSON.stringify(x.expected)}`, () => {
        const actual = CurrencyInputHelper.safeInsert(x.value, x.start, x.end, x.input, {
          integerDigits: x.integerDigits,
          fractionDigits: x.fractionDigits,
          unsigned: x.unsigned,
        });
        const expected = x.expected;
        expect(actual).toEqual(expected);
      });
    });
  });
});
