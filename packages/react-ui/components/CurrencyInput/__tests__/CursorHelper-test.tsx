import { CursorHelper } from '../CursorHelper';
import { Selection } from '../SelectionHelper';

describe('CursorHelper', () => {
  describe('toRawPosition', () => {
    [
      { value: [0], position: 0, expected: 0 },
      { value: [0], position: 1, expected: 0 },
      { value: [0], position: -1, expected: 0 },
      { value: [0, 1], position: 0, expected: 0 },
      { value: [0, 1], position: 1, expected: 1 },
      { value: [0, 1, 2, 3], position: 0, expected: 0 },
      { value: [0, 1, 2, 3], position: 1, expected: 1 },
      { value: [0, 1, 2, 3], position: 2, expected: 2 },
      { value: [0, 1, 2, 3], position: 3, expected: 3 },
      { value: [0, 2, 2, 3], position: 0, expected: 0 },
      { value: [0, 2, 2, 3], position: 1, expected: 1 },
      { value: [0, 2, 2, 3], position: 2, expected: 1 },
      { value: [0, 2, 2, 3], position: 3, expected: 2 },
      { value: [0, 1, 1, 2], position: 0, expected: 0 },
      { value: [0, 1, 1, 2], position: 1, expected: 1 },
      { value: [0, 1, 1, 2], position: 2, expected: 1 },
      { value: [0, 1, 1, 2], position: 3, expected: 2 },
    ].forEach((x) => {
      it(`toRawPosition([${x.value}], ${x.position}) === ${x.expected}`, () => {
        const actual = CursorHelper.toRawPosition(x.value, x.position);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });

  describe('toFormattedPosition', () => {
    [
      { value: [0], position: 0, expected: 0 },
      { value: [0], position: 1, expected: 0 },
      { value: [0], position: -1, expected: 0 },
      { value: [0, 1], position: 0, expected: 0 },
      { value: [0, 1], position: 1, expected: 1 },
      { value: [0, 1, 2, 3], position: -1, expected: 0 },
      { value: [0, 1, 2, 3], position: 4, expected: 3 },
      { value: [0, 1, 2, 3], position: 0, expected: 0 },
      { value: [0, 1, 2, 3], position: 1, expected: 1 },
      { value: [0, 1, 2, 3], position: 2, expected: 2 },
      { value: [0, 1, 2, 3], position: 3, expected: 3 },
      { value: [0, 2, 2, 3], position: 0, expected: 0 },
      { value: [0, 2, 2, 3], position: 1, expected: 2 },
      { value: [0, 2, 2, 3], position: 2, expected: 3 },
      { value: [0, 1, 1, 3], position: 0, expected: 0 },
      { value: [0, 1, 1, 3], position: 1, expected: 1 },
      { value: [0, 1, 1, 3], position: 2, expected: 3 },
    ].forEach((x) => {
      it(`toFormattedPosition([${x.value}], ${x.position}) === ${x.expected}`, () => {
        const actual = CursorHelper.toFormattedPosition(x.value, x.position);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });

  describe('calculatePosition', () => {
    [
      { value: [0], position: 0, step: 0, expected: 0 },
      { value: [0], position: 0, step: 1, expected: 0 },
      { value: [0], position: 0, step: -1, expected: 0 },

      { value: [0, 1, 2, 3], position: 0, step: -1, expected: 0 },
      { value: [0, 1, 2, 3], position: 3, step: 1, expected: 3 },

      { value: [0, 1, 2, 3], position: 0, step: 1, expected: 1 },
      { value: [0, 1, 2, 3], position: 1, step: 2, expected: 3 },
      { value: [0, 1, 2, 3], position: 1, step: 6, expected: 3 },
      { value: [0, 1, 2, 3], position: 1, step: -1, expected: 0 },
      { value: [0, 1, 2, 3], position: 1, step: -2, expected: 0 },

      { value: [0, 2, 2, 3], position: 0, step: 1, expected: 2 },
      { value: [0, 2, 2, 3], position: 0, step: 2, expected: 3 },
      { value: [0, 2, 2, 3], position: 1, step: 1, expected: 3 },
      { value: [0, 2, 2, 3], position: 1, step: -1, expected: 0 },
      { value: [0, 2, 2, 3], position: 2, step: -1, expected: 0 },
    ].forEach((x) => {
      it(`calculatePosition([${x.value}], ${x.position}, ${x.step}) === ${x.expected}`, () => {
        const actual = CursorHelper.calculatePosition(x.value, x.position, x.step);
        const expected = x.expected;
        expect(actual).toBe(expected);
      });
    });
  });

  describe('normalizeSelection', () => {
    [
      {
        map: [0],
        selection: { start: -1, end: 1, direction: 'xxx' },
        expected: { start: 0, end: 0, direction: 'none' },
      },
      {
        map: [0, 1, 2],
        selection: { start: -1, end: 0, direction: '' },
        expected: { start: 0, end: 0, direction: 'none' },
      },
      {
        map: [0, 1, 2],
        selection: { start: 1, end: 1, direction: '' },
        expected: { start: 1, end: 1, direction: 'none' },
      },
      {
        map: [0, 1, 2],
        selection: { start: 2, end: 4, direction: '' },
        expected: { start: 2, end: 2, direction: 'none' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 1, end: 2, direction: 'forward' },
        expected: { start: 2, end: 2, direction: 'none' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 0, end: 2, direction: 'forward' },
        expected: { start: 0, end: 2, direction: 'forward' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 2, end: 0, direction: 'forward' },
        expected: { start: 0, end: 2, direction: 'backward' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 0, end: 2, direction: 'backward' },
        expected: { start: 0, end: 2, direction: 'backward' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 2, end: 0, direction: 'backward' },
        expected: { start: 0, end: 2, direction: 'forward' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 0, end: 2, direction: 'none' },
        expected: { start: 0, end: 2, direction: 'forward' },
      },
      {
        map: [0, 2, 2, 3],
        selection: { start: 2, end: 0, direction: 'none' },
        expected: { start: 0, end: 2, direction: 'backward' },
      },
    ].forEach((x) => {
      it(`normalizeSelection([${x.map}], ${JSON.stringify(x.selection)}) === ${JSON.stringify(x.expected)}`, () => {
        const actual = CursorHelper.normalizeSelection(x.map, x.selection as Selection);
        const expected = x.expected;
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('extendSelection', () => {
    [
      {
        value: [0],
        selection: { start: 0, end: 0, direction: 'none' },
        step: 1,
        expected: { start: 0, end: 0, direction: 'none' },
      },
      {
        value: [0],
        selection: { start: 0, end: 0, direction: 'none' },
        step: -1,
        expected: { start: 0, end: 0, direction: 'none' },
      },
      {
        value: [0],
        selection: { start: 0, end: 0, direction: 'forward' },
        step: 1,
        expected: { start: 0, end: 0, direction: 'none' },
      },

      {
        value: [0, 1, 2, 3],
        selection: { start: 0, end: 0, direction: 'none' },
        step: 1,
        expected: { start: 0, end: 1, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 3],
        selection: { start: 1, end: 2, direction: 'forward' },
        step: 1,
        expected: { start: 1, end: 3, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 3],
        selection: { start: 1, end: 2, direction: 'forward' },
        step: -1,
        expected: { start: 1, end: 1, direction: 'none' },
      },
      {
        value: [0, 1, 2, 3],
        selection: { start: 1, end: 2, direction: 'backward' },
        step: 1,
        expected: { start: 2, end: 2, direction: 'none' },
      },
      {
        value: [0, 1, 2, 3],
        selection: { start: 1, end: 2, direction: 'backward' },
        step: -1,
        expected: { start: 0, end: 2, direction: 'backward' },
      },

      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 2, direction: 'none' },
        step: 1,
        expected: { start: 2, end: 4, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 2, direction: 'none' },
        step: 2,
        expected: { start: 2, end: 5, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 2, direction: 'none' },
        step: -1,
        expected: { start: 1, end: 2, direction: 'backward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 2, direction: 'none' },
        step: -2,
        expected: { start: 0, end: 2, direction: 'backward' },
      },

      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'forward' },
        step: 1,
        expected: { start: 2, end: 5, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'forward' },
        step: 2,
        expected: { start: 2, end: 6, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'forward' },
        step: -1,
        expected: { start: 2, end: 2, direction: 'none' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'forward' },
        step: -2,
        expected: { start: 1, end: 2, direction: 'backward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 5, direction: 'forward' },
        step: -1,
        expected: { start: 2, end: 4, direction: 'forward' },
      },

      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'backward' },
        step: 1,
        expected: { start: 4, end: 4, direction: 'none' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'backward' },
        step: 2,
        expected: { start: 4, end: 5, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'backward' },
        step: -1,
        expected: { start: 1, end: 4, direction: 'backward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 4, direction: 'backward' },
        step: -2,
        expected: { start: 0, end: 4, direction: 'backward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 2, end: 5, direction: 'backward' },
        step: 1,
        expected: { start: 4, end: 5, direction: 'backward' },
      },

      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 3, end: 3, direction: 'none' },
        step: 1,
        expected: { start: 4, end: 5, direction: 'forward' },
      },
      {
        value: [0, 1, 2, 4, 4, 5, 6],
        selection: { start: 3, end: 3, direction: 'none' },
        step: -1,
        expected: { start: 2, end: 4, direction: 'backward' },
      },
    ].forEach((x) => {
      it(`extendSelection('[${x.value}]', ${JSON.stringify(x.selection)}, '${x.step}') === '${JSON.stringify(
        x.expected,
      )}`, () => {
        const actual = CursorHelper.extendSelection(x.value, x.selection as Selection, x.step);
        const expected = x.expected;
        expect(actual).toEqual(expected);
      });
    });
  });
});
