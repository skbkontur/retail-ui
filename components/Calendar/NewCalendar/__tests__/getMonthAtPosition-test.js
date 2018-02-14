// @flow

import { createMonth } from '../Month';
import { getMonthAtPosition } from '../getMonthAtPosition';
import { getMonthHeight } from '../MonthExtensions';

let tGetMonthHeight = m => getMonthHeight(m, 10, 0, 0);
let tGetMonthAtPosition = (pos, m) =>
  getMonthAtPosition(pos, m, tGetMonthHeight);

test('getMonthsAtPosition', () => {
  let initialMonth = createMonth(1, 2018);

  let cases = [
    {
      args: [-110, initialMonth],
      expected: { relativePosition: -40, month: createMonth(10, 2017) }
    },
    {
      args: [-100, initialMonth],
      expected: { relativePosition: 0, month: createMonth(11, 2017) }
    },
    {
      args: [-50, initialMonth],
      expected: { relativePosition: 0, month: createMonth(0, 2018) }
    },
    {
      args: [-10, initialMonth],
      expected: { relativePosition: -40, month: createMonth(0, 2018) }
    },
    {
      args: [10, initialMonth],
      expected: { relativePosition: -10, month: createMonth(1, 2018) }
    },
    {
      args: [50, initialMonth],
      expected: { relativePosition: 0, month: createMonth(2, 2018) }
    },
    {
      args: [100, initialMonth],
      expected: { relativePosition: 0, month: createMonth(3, 2018) }
    },
    {
      args: [110, initialMonth],
      expected: { relativePosition: -10, month: createMonth(3, 2018) }
    },
    {
      args: [180, initialMonth],
      expected: { relativePosition: -20, month: createMonth(4, 2018) }
    }
  ];

  cases.forEach(({ args, expected }) => {
    expect(tGetMonthAtPosition(...args)).toEqual(expected);
  });
});
