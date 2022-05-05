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
  let nextValue;
  const firstDigits = getFirstDigits(type, maxValue);
  const maxLength = getMaxLength(type);

  if (!inputMode) {
    nextValue = key;
    nextInputMode = Number(key) <= firstDigits;
  } else {
    nextValue = `${prev === null ? '' : prev}${key}`.slice(-maxLength);
    nextInputMode = nextValue.length < maxLength;
    if (Number(nextValue) > maxValue || (Number(nextValue) === 0 && nextValue.length === maxLength)) {
      nextValue = prev + '';
      nextInputMode = true;
    }
  }

  return { nextValue, nextInputMode };
};

function getFirstDigits(type: InternalDateComponentType | null, maxValue: number) {
  let first = 10;
  if (type === InternalDateComponentType.Month) {
    first = 1;
  }
  if (type === InternalDateComponentType.Date) {
    first = Math.floor(maxValue / 10);
  }
  return first;
}

function getMaxLength(type: InternalDateComponentType | null) {
  let length = LENGTH_YEAR;
  if (type === InternalDateComponentType.Month) {
    length = LENGTH_MONTH;
  }
  if (type === InternalDateComponentType.Date) {
    length = LENGTH_DATE;
  }
  return length;
}
