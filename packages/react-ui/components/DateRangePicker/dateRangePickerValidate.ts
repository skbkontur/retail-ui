import { InternalDateOrder, InternalDateSeparator, InternalDateValidateCheck } from '../../lib/date/types';
import { InternalDate } from '../../lib/date/InternalDate';
import { MAX_FULLDATE, MIN_FULLDATE } from '../../lib/date/constants';

export function dateRangePickerValidate(value: string[], range: { minDate?: string; maxDate?: string } = {}) {
  if (!value || !value[0] || !value[1]) {
    return [false, false];
  }

  const { minDate = MIN_FULLDATE, maxDate = MAX_FULLDATE } = range;
  const internalDates = new InternalDate({
    order: InternalDateOrder.DMY,
    separator: InternalDateSeparator.Dot,
  })
    .setRangeStart(new InternalDate({ value: minDate }))
    .setRangeEnd(new InternalDate({ value: maxDate }));

  return [checkDate(internalDates.parseValue(value[0])), checkDate(internalDates.parseValue(value[1]))];
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
