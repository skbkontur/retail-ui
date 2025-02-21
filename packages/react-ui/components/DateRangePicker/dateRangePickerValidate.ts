import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../lib/date/types';
import { InternalDate } from '../../lib/date/InternalDate';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';
import { isGreater } from '../../lib/date/comparison';

export function dateRangePickerValidate(
  startValue = '',
  endValue = '',
  { startOptional = false, endOptional = false, minDate = MIN_FULLDATE, maxDate = MAX_FULLDATE },
) {
  if ((!startOptional && !startValue) || (!endOptional && !endValue)) {
    return [false, false];
  }

  if (isGreater(startValue, endValue)) {
    return [false, false];
  }

  const internalDate = new InternalDate({
    order: InternalDateOrder.DMY,
    separator: InternalDateSeparator.Dot,
  })
    .setRangeStart(new InternalDate({ value: minDate }))
    .setRangeEnd(new InternalDate({ value: maxDate }));

  const startValidation = checkDate(internalDate.parseValue(startValue));
  const endValidation = checkDate(internalDate.parseValue(endValue));

  return [startValidation, endValidation];
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
