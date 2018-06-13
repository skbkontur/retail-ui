import CurrencyInputHelper from '../CurrencyInputHelper';

describe('CurrencyInputHelper', () => {
  describe('insert', () => {
    [
      {
        value: '',
        start: -1,
        end: 0,
        input: '',
        expected: { value: '', position: 0 }
      },
      {
        value: '',
        start: 0,
        end: 1,
        input: '',
        expected: { value: '', position: 0 }
      },
      {
        value: '',
        start: -1,
        end: 0,
        input: '8',
        expected: { value: '8', position: 1 }
      },
      {
        value: '',
        start: 0,
        end: 1,
        input: '8',
        expected: { value: '8', position: 1 }
      },
      {
        value: '',
        start: 0,
        end: 0,
        input: '1',
        expected: { value: '1', position: 1 }
      },
      {
        value: '8',
        start: 0,
        end: 0,
        input: '1',
        expected: { value: '18', position: 1 }
      },
      {
        value: '8',
        start: 1,
        end: 1,
        input: '1',
        expected: { value: '81', position: 2 }
      },
      {
        value: '8',
        start: 0,
        end: 1,
        input: '1',
        expected: { value: '1', position: 1 }
      },
      {
        value: '88',
        start: 0,
        end: 1,
        input: '1',
        expected: { value: '18', position: 1 }
      },
      {
        value: '88',
        start: 1,
        end: 1,
        input: '1',
        expected: { value: '818', position: 2 }
      },
      {
        value: '88',
        start: 1,
        end: 2,
        input: '1',
        expected: { value: '81', position: 2 }
      },
      {
        value: '888',
        start: 1,
        end: 2,
        input: '1',
        expected: { value: '818', position: 2 }
      },

      {
        value: '888 888',
        start: 3,
        end: 3,
        input: '1',
        expected: { value: '8\u2009881\u2009888', position: 6 }
      },
      {
        value: '888 888',
        start: 4,
        end: 4,
        input: '1',
        expected: { value: '8\u2009881\u2009888', position: 6 }
      },
      {
        value: '888 888',
        start: 3,
        end: 4,
        input: '1',
        expected: { value: '8\u2009881\u2009888', position: 6 }
      },
      {
        value: '888 888',
        start: 2,
        end: 5,
        input: '1',
        expected: { value: '88\u2009188', position: 4 }
      },
      {
        value: '888 888',
        start: 2,
        end: 5,
        input: '11',
        expected: { value: '881\u2009188', position: 5 }
      },
      {
        value: '888 888',
        start: 3,
        end: 4,
        input: '',
        expected: { value: '888\u2009888', position: 4 }
      },
      {
        value: '888 888',
        start: 2,
        end: 4,
        input: '',
        expected: { value: '88\u2009888', position: 3 }
      },
      {
        value: '888 888',
        start: 2,
        end: 3,
        input: '',
        expected: { value: '88\u2009888', position: 3 }
      },
      {
        value: '888 888',
        start: 4,
        end: 5,
        input: '',
        expected: { value: '88\u2009888', position: 4 }
      },
      {
        value: '8 888',
        start: 0,
        end: 2,
        input: '',
        expected: { value: '888', position: 0 }
      }
    ].forEach(x => {
      it(`insert('${x.value}', ${x.start}, ${x.end}, '${x.input}') === {'${
        x.expected.value
      }' : ${x.expected.position}}`, () => {
        const actual = CurrencyInputHelper.insert(
          x.value,
          x.start,
          x.end,
          x.input
        );
        const expected = x.expected;
        expect(actual).toEqual(expected);
      });
    });
  });
});
