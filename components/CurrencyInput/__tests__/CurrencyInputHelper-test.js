import CurrencyInputHelper from '../CurrencyInputHelper';

describe('CurrencyInputHelper', () => {
  describe('toUnformattedPosition', () => {
    [
      { value: '', position: 0, expected: 0 },
      { value: ',', position: 0, expected: 0 },
      { value: ',', position: 1, expected: 1 },
      { value: '8,', position: 0, expected: 0 },
      { value: '8', position: 1, expected: 1 },
      { value: '0,00', position: 0, expected: 0 },
      { value: '0,00', position: 1, expected: 1 },
      { value: '0,00', position: 2, expected: 2 },
      { value: '0,00', position: 3, expected: 3 },
      { value: '0,00', position: 4, expected: 4 },
      { value: '1234567,90', position: 0, expected: 0 },
      { value: '1234567,90', position: 1, expected: 1 },
      { value: '1234567,90', position: 2, expected: 1 },
      { value: '1234567,90', position: 3, expected: 2 },
      { value: '1234567,90', position: 4, expected: 3 },
      { value: '1234567,90', position: 5, expected: 4 },
      { value: '1234567,90', position: 6, expected: 4 },
      { value: '1234567,90', position: 7, expected: 5 },
      { value: '1234567,90', position: 8, expected: 6 },
      { value: '1234567,90', position: 9, expected: 7 },
      { value: '1234567,90', position: 10, expected: 8 },
      { value: '1234567,90', position: 11, expected: 9 },
      { value: '1234567,90', position: 12, expected: 10 },
      { value: '1234,6789', position: 0, expected: 0 },
      { value: '1234,6789', position: 1, expected: 1 },
      { value: '1234,6789', position: 2, expected: 1 },
      { value: '1234,6789', position: 3, expected: 2 },
      { value: '1234,6789', position: 4, expected: 3 },
      { value: '1234,6789', position: 5, expected: 4 },
      { value: '1234,6789', position: 6, expected: 5 },
      { value: '1234,6789', position: 7, expected: 6 },
      { value: '1234,6789', position: 8, expected: 7 },
      { value: '1234,6789', position: 9, expected: 8 },
      { value: '1234,6789', position: 10, expected: 9 }
    ].forEach(x => {
      it(`toUnformattedPosition('${x.value}', ${x.position}) === ${x.expected}`, () => {
        const actual = CurrencyInputHelper.toUnformattedPosition(
          x.value,
          x.position
        );
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });

  describe('toFormattedPosition', () => {
    [
      { value: '', position: 0, expected: 0 },
      { value: ',', position: 0, expected: 0 },
      { value: ',', position: 1, expected: 1 },
      { value: '8,', position: 0, expected: 0 },
      { value: '8', position: 1, expected: 1 },
      { value: '0,00', position: 0, expected: 0 },
      { value: '0,00', position: 1, expected: 1 },
      { value: '0,00', position: 2, expected: 2 },
      { value: '0,00', position: 3, expected: 3 },
      { value: '0,00', position: 4, expected: 4 },
      { value: '1234567,90', position: 0, expected: 0 },
      { value: '1234567,90', position: 1, expected: 2 },
      { value: '1234567,90', position: 2, expected: 3 },
      { value: '1234567,90', position: 3, expected: 4 },
      { value: '1234567,90', position: 4, expected: 6 },
      { value: '1234567,90', position: 5, expected: 7 },
      { value: '1234567,90', position: 6, expected: 8 },
      { value: '1234567,90', position: 7, expected: 9 },
      { value: '1234567,90', position: 8, expected: 10 },
      { value: '1234567,90', position: 9, expected: 11 },
      { value: '1234567,90', position: 10, expected: 12 },
      { value: '1234,6789', position: 0, expected: 0 },
      { value: '1234,6789', position: 1, expected: 2 },
      { value: '1234,6789', position: 2, expected: 3 },
      { value: '1234,6789', position: 3, expected: 4 },
      { value: '1234,6789', position: 4, expected: 5 },
      { value: '1234,6789', position: 5, expected: 6 },
      { value: '1234,6789', position: 6, expected: 7 },
      { value: '1234,6789', position: 7, expected: 8 },
      { value: '1234,6789', position: 8, expected: 9 },
      { value: '1234,6789', position: 9, expected: 10 }
    ].forEach(x => {
      it(`toFormattedPosition('${x.value}', ${x.position}) === ${x.expected}`, () => {
        const actual = CurrencyInputHelper.toFormattedPosition(
          x.value,
          x.position
        );
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });

  describe('calculateFormattedPosition', () => {
    [
      { value: '', position: 0, step: 0, expected: 0 },
      { value: ',', position: 0, step: 1, expected: 1 },
      { value: '123', position: 1, step: 1, expected: 2 },
      { value: '123', position: 2, step: -1, expected: 1 },
      { value: '123 456', position: 1, step: 1, expected: 2 },
      { value: '123 456', position: 2, step: -1, expected: 1 },
      { value: '123 456', position: 2, step: 1, expected: 4 },
      { value: '123 456', position: 4, step: -1, expected: 2 },
      { value: '123 456', position: 5, step: 1, expected: 6 },
      { value: '123 456', position: 6, step: -1, expected: 5 },
      { value: '123 456', position: 2, step: 3, expected: 6 },
      { value: '123 456', position: 6, step: -3, expected: 2 }
    ].forEach(x => {
      it(`calculateFormattedPosition('${x.value}', ${x.position}, ${x.step}) === ${x.expected}`, () => {
        const actual = CurrencyInputHelper.calculateFormattedPosition(
          x.value,
          x.position,
          x.step
        );
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });

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
      //{value: '123', start: 2, end: 1, input: '8', expected: {value: '183', position: 2}},

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
      it(`insert('${x.value}', ${x.start}, ${x.end}, '${x.input}') === {'${x
        .expected.value}' : ${x.expected.position}}`, () => {
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

  describe('extendSelection', () => {
    [
      {
        value: '',
        selection: { start: 0, end: 0, direction: 'none' },
        step: 1,
        expected: { start: 0, end: 0, direction: 'none' }
      },
      {
        value: '',
        selection: { start: 0, end: 0, direction: 'none' },
        step: -1,
        expected: { start: 0, end: 0, direction: 'none' }
      },
      {
        value: '',
        selection: { start: 0, end: 0, direction: 'forward' },
        step: 1,
        expected: { start: 0, end: 0, direction: 'none' }
      },

      {
        value: '123',
        selection: { start: 0, end: 0, direction: 'none' },
        step: 1,
        expected: { start: 0, end: 1, direction: 'forward' }
      },
      {
        value: '123',
        selection: { start: 1, end: 2, direction: 'forward' },
        step: 1,
        expected: { start: 1, end: 3, direction: 'forward' }
      },
      {
        value: '123',
        selection: { start: 1, end: 2, direction: 'forward' },
        step: -1,
        expected: { start: 1, end: 1, direction: 'none' }
      },
      {
        value: '123',
        selection: { start: 1, end: 2, direction: 'backward' },
        step: 1,
        expected: { start: 2, end: 2, direction: 'none' }
      },
      {
        value: '123',
        selection: { start: 1, end: 2, direction: 'backward' },
        step: -1,
        expected: { start: 0, end: 2, direction: 'backward' }
      },

      {
        value: '123 456',
        selection: { start: 2, end: 2, direction: 'none' },
        step: 1,
        expected: { start: 2, end: 4, direction: 'forward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 2, direction: 'none' },
        step: 2,
        expected: { start: 2, end: 5, direction: 'forward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 2, direction: 'none' },
        step: -1,
        expected: { start: 1, end: 2, direction: 'backward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 2, direction: 'none' },
        step: -2,
        expected: { start: 0, end: 2, direction: 'backward' }
      },

      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'forward' },
        step: 1,
        expected: { start: 2, end: 5, direction: 'forward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'forward' },
        step: 2,
        expected: { start: 2, end: 6, direction: 'forward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'forward' },
        step: -1,
        expected: { start: 2, end: 2, direction: 'none' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'forward' },
        step: -2,
        expected: { start: 1, end: 2, direction: 'backward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 5, direction: 'forward' },
        step: -1,
        expected: { start: 2, end: 4, direction: 'forward' }
      },

      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'backward' },
        step: 1,
        expected: { start: 4, end: 4, direction: 'none' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'backward' },
        step: 2,
        expected: { start: 4, end: 5, direction: 'forward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'backward' },
        step: -1,
        expected: { start: 1, end: 4, direction: 'backward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 4, direction: 'backward' },
        step: -2,
        expected: { start: 0, end: 4, direction: 'backward' }
      },
      {
        value: '123 456',
        selection: { start: 2, end: 5, direction: 'backward' },
        step: 1,
        expected: { start: 4, end: 5, direction: 'backward' }
      },

      {
        value: '123 456',
        selection: { start: 3, end: 3, direction: 'none' },
        step: 1,
        expected: { start: 4, end: 5, direction: 'forward' }
      },
      {
        value: '123 456',
        selection: { start: 3, end: 3, direction: 'none' },
        step: -1,
        expected: { start: 2, end: 4, direction: 'backward' }
      }
    ].forEach(x => {
      it(`extendSelection('${x.value}', ${JSON.stringify(
        x.selection
      )}, '${x.step}') === '${JSON.stringify(x.expected)}`, () => {
        const actual = CurrencyInputHelper.extendSelection(
          x.value,
          x.selection,
          x.step
        );
        const expected = x.expected;
        expect(actual).toEqual(expected);
      });
    });
  });
});
