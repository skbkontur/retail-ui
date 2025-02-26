import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../lib/date/types';
import { InternalDate } from '../../lib/date/InternalDate';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { isGreater } from '../../lib/date/comparison';
import { Nullable } from '../../typings/utility-types';

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

export function dateRangePickerValidate(
  startValue: Nullable<string>,
  endValue: Nullable<string>,
  options: ValidationOptions = defaultOptions,
) {
  const { startOptional, endOptional, minDate, maxDate } = { ...defaultOptions, ...options };

  if (startOptional && !startValue && endOptional && !endValue) {
    return [true, true];
  }

  const isStartRequiredAndEmpty = !startOptional && !startValue;
  const isEndRequiredAndEmpty = !endOptional && !endValue;

  if (isStartRequiredAndEmpty || isEndRequiredAndEmpty) {
    return [!isStartRequiredAndEmpty, !isEndRequiredAndEmpty];
  }

  const isValuesRequired = !startOptional && !endOptional;
  if (isValuesRequired && isGreater(startValue || '', endValue || '')) {
    return [false, false];
  }

  const internalDate = new InternalDate({
    order: InternalDateOrder.DMY,
    separator: InternalDateSeparator.Dot,
  })
    .setRangeStart(new InternalDate({ value: minDate }))
    .setRangeEnd(new InternalDate({ value: maxDate }));

  const isStartValid = startValue ? checkDate(internalDate.parseValue(startValue)) : true;
  const isEndValid = endValue ? checkDate(internalDate.parseValue(endValue)) : true;

  return [isStartValid, isEndValid];
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
