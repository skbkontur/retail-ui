// @flow
import { createMonth } from '../Month';
import {
  getMonthHeight,
  getFirstDayOffset,
  countMonthDays
} from '../MonthExtensions';

describe('getFirstDayOffset', () => {
  let cases = [
    { args: [0, 2018], expected: 0 },
    { args: [1, 2018], expected: 3 },
    { args: [3, 2018], expected: 6 }
  ];

  cases.forEach(({ args, expected }) => {
    test(`getFirstDayOffset for month ${args[0]}/${args[1]}`, () => {
      expect(getFirstDayOffset(createMonth(...args))).toBe(expected);
    });
  });
});

describe('countMonthDays', () => {
  let cases = [
    { args: [0, 2018], expected: 31 },
    { args: [1, 2018], expected: 28 },
    { args: [3, 2018], expected: 30 },
    { args: [1, 2016], expected: 29 }
  ];

  cases.forEach(({ args, expected }) => {
    test(`countMonthDays for month ${args[0]}/${args[1]}`, () => {
      expect(countMonthDays(createMonth(...args))).toBe(expected);
    });
  });
});

describe('getMonthHeight', () => {
  // preconfigured getMonthHeight
  let tGetMonthHeight = m => getMonthHeight(m, 10, 0, 0);

  let cases = [
    { args: [1, 2018], expected: 50 },
    { args: [3, 2018], expected: 60 },
    { args: [1, 2010], expected: 40 }
  ];

  cases.forEach(({ args, expected }) => {
    test(`getMonthHeight for month ${args[0]}/${args[1]}`, () => {
      expect(tGetMonthHeight(createMonth(...args))).toBe(expected);
    });
  });
});
