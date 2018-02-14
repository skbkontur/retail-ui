// @flow
import { type Month, createMonth, getMonthIndex, getYear } from './Month';
import { getMonthHeight as defaultGetMonthHeight } from './MonthExtensions';

/**
 * Maximum 3 months can be displayed at once on the screen
 * (depends on calendar height)
 *
 *  -P-Month -------------
 *  -[]-[]-[]-[]-[]-[]-[]-
 *  -[]-[]-[]-[]-[]-[]-[]-
 *  -[]-[]-[]-[]-[]-[]-[]-
 *  -[]-[]-[]-[]-[]-[]-[]-
 * |=====// Screen //=====| <- CurrentPosition
 * |-[]-[]-[]-------------|
 * |----------------------|
 * |-M-Month -------------|
 * |----------[]-[]-[]-[]-|
 * |-[]-[]-[]-[]-[]-[]-[]-|
 * |-[]-[]-[]-[]-[]-[]-[]-|
 * |-[]-[]-[]-[]-[]-[]-[]-|
 * |-[]-[]-[]-------------|
 * |----------------------|
 * |- N-Month ------------|
 * |----------[]-[]-[]-[]-|
 * |-[]-[]-[]-[]-[]-[]-[]-|
 * |======================|
 *  -[]-[]-[]-[]-[]-[]-[]-
 *  -[]-[]-[]-[]-[]-[]-[]-
 *  -[]-[]-[]-[]-[]-[]----
 *
 *  ----- Init Month -----  <- Zero
 *
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

// TODO: not working, fix implementation
export function getMonthAtPosition(
  currentPosition: number,
  initialMonth: Month,
  getMonthHeight: (month: Month) => number = defaultGetMonthHeight
) {
  let currentMonth = initialMonth;
  let accumulate = 0;

  let offset = currentPosition - getMonthHeight(initialMonth);
  if (offset >= 0) {
    while (accumulate <= offset) {
      accumulate += getMonthHeight(currentMonth);
      currentMonth = createMonth(
        getMonthIndex(currentMonth) + 1,
        getYear(currentMonth)
      );
    }
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
