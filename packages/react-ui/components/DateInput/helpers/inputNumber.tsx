import { LENGTH_DATE, LENGTH_MONTH, LENGTH_YEAR } from '../../../lib/date/constants';
import { InternalDateComponentRaw, InternalDateComponentType } from '../../../lib/date/types';

export const inputNumber = (
  type: InternalDateComponentType | null,
  prev: InternalDateComponentRaw,
  key: string,
  inputMode: boolean,
  maxValue: number,
): { nextValue: InternalDateComponentRaw; nextInputMode: boolean } => {
  let nextInputMode = false;
  let nextValue: string;
  let first = 10;
  let length: number = LENGTH_YEAR;
  if (type === InternalDateComponentType.Month) {
    first = 1;
    length = LENGTH_MONTH;
  }
  if (type === InternalDateComponentType.Date) {
    first = Math.floor(maxValue / 10);
    length = LENGTH_DATE;
  }
  if (!inputMode) {
    nextValue = key;
    nextInputMode = Number(key) <= first;
  } else {
    nextValue = `${prev === null ? '' : prev}${key}`.slice(-length);
    nextInputMode = nextValue.length < length;
    if (Number(nextValue) > maxValue || (Number(nextValue) === 0 && nextValue.length === length)) {
      nextValue = prev + '';
      nextInputMode = true;
    }
  }
  return { nextValue, nextInputMode };
};
