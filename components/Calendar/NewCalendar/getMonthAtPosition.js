// @flow
import { type Month, createMonth, getMonthIndex, getYear } from './Month';
import { getMonthHeight } from './MonthExtensions';

/**
 * Maximum 3 months can be displayed at once on the screen
 * (depends on calendar height)
 *
 *  ------ P-Month ------
 * |======================| <- CurrentPosition
 * |------ M-Month -------|
 * |    // Screen //      |
 * |------ N-Month -------|
 * |======================|
 *
 *  ----- Init Month -----  <- Zero
 *
 * If screen before P-Month (CurrentPosition <= PrevMonthY):
 *  - N-Months removes
 *  - Prepending month before P-Month
 *
 * If screen after P-Month (CurrentPosition >= PrevMonthY + PrevMonthHeight):
 *  - P-Months removes
 *  - Appending month after N-Month
 *
 * It means screen can move from start of P-Month
 * and to the end of P-Month
 *
 * Init Month is the P-Month
 *
 * MonthY = range (InitMonth, Month) |> map GetMonthHeight |> sum
 */

export function getMonthAtPosition(
  currentPosition: number,
  initialMonth: Month,
  getMonthHeight: (month: Month) => number = getMonthHeight
) {
  let currentMonth = initialMonth;
  let accumulate = 0;
  if (currentPosition > 0) {
    do {
      accumulate += getMonthHeight(currentMonth);
      currentMonth = createMonth(
        getMonthIndex(currentMonth) + 1,
        getYear(currentMonth)
      );
    } while (accumulate < currentPosition);
  }

  if (currentPosition < 0) {
    do {
      accumulate -= getMonthHeight(currentMonth);
      currentMonth = createMonth(
        getMonthIndex(currentMonth) - 1,
        getYear(currentMonth)
      );
    } while (accumulate > currentPosition);
  }

  return {
    month: currentMonth,
    relativePosition: accumulate - currentPosition
  };
}
