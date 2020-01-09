import { LENGTH_DATE, LENGTH_MONTH, LENGTH_YEAR } from '../../../lib/date/constants';
import { InternalDateComponentType, InternalDateComponentRaw } from '../../../lib/date/types';

export const inputNumber = (
  type: InternalDateComponentType | null,
  prev: InternalDateComponentRaw,
  key: string,
  inputMode: boolean,
): { nextValue: InternalDateComponentRaw; nextInputMode: boolean } => {
  let nextInputMode = false;
  let nextValue: string;
  let first: number = 10;
  let length: number = LENGTH_YEAR;
  if (type === InternalDateComponentType.Month) {
    first = 1;
    length = LENGTH_MONTH;
  }
  if (type === InternalDateComponentType.Date) {
    first = 3;
    length = LENGTH_DATE;
  }
  if (!inputMode) {
    nextValue = key;
    nextInputMode = Number(key) <= first;
  } else {
    nextValue = `${prev === null ? '' : prev}${key}`.slice(-length);
    nextInputMode = nextValue.length < length;
  }
  return { nextValue, nextInputMode };
};
