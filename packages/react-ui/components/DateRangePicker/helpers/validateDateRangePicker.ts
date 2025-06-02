import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../../lib/date/types';
import { InternalDate } from '../../../lib/date/InternalDate';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../../lib/date/constants';
import { isLessOrEqual } from '../../../lib/date/comparison';
import type { Nullable } from '../../../typings/utility-types';

interface ValidationOptions {
  startOptional?: boolean;
  endOptional?: boolean;
  minDate?: string;
  maxDate?: string;
}

const defaultOptions: ValidationOptions = {
  startOptional: false,
  endOptional: false,
  minDate: MIN_FULLDATE,
  maxDate: MAX_FULLDATE,
};

export function validateDateRangePicker(
  startValue: Nullable<string>,
  endValue: Nullable<string>,
  options: ValidationOptions = defaultOptions,
) {
  const { startOptional, endOptional, minDate, maxDate } = { ...defaultOptions, ...options };
  const isStartEmpty = !startValue;
  const isStartRequired = !startOptional;
  const isEndEmpty = !endValue;
  const isEndRequired = !endOptional;

  if (!isStartEmpty && !isEndEmpty && !isRangeValid(startValue, endValue)) {
    return [false, false];
  }

  const internalDate = getInternalDate(minDate, maxDate);

  const isStartValid = isStartEmpty ? !isStartRequired : checkDate(internalDate.parseValue(startValue));
  const isEndValid = isEndEmpty ? !isEndRequired : checkDate(internalDate.parseValue(endValue));

  return [isStartValid, isEndValid];
}

function isRangeValid(startValue: Nullable<string>, endValue: Nullable<string>) {
  return isLessOrEqual(startValue || '', endValue || '');
}

function getInternalDate(minDate?: string, maxDate?: string) {
  return new InternalDate({
    order: InternalDateOrder.DMY,
    separator: InternalDateSeparator.Dot,
  })
    .setRangeStart(new InternalDate({ value: minDate }))
    .setRangeEnd(new InternalDate({ value: maxDate }));
}

function checkDate(internalDate: InternalDate) {
  return internalDate.validate({
    checks: [
      InternalDateValidateCheck.NotNull,
      InternalDateValidateCheck.Number,
      InternalDateValidateCheck.Native,
      InternalDateValidateCheck.Limits,
      InternalDateValidateCheck.Range,
    ],
  });
}
