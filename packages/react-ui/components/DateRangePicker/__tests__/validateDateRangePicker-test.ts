import { validateDateRangePicker as validate } from '../helpers/validateDateRangePicker';
import { InternalDate } from '../../../lib/date/InternalDate';
import { MIN_FULLDATE, MAX_FULLDATE } from '../../../lib/date/constants';

describe('validate', () => {
  it(`should validate by default range ${MIN_FULLDATE} - ${MAX_FULLDATE}`, () => {
    expect(validate(MIN_FULLDATE, MAX_FULLDATE)).toEqual([true, true]);
    expect(validate(MIN_FULLDATE, MIN_FULLDATE)).toEqual([true, true]);
    expect(validate(MAX_FULLDATE, MAX_FULLDATE)).toEqual([true, true]);
    expect(validate(MAX_FULLDATE, MIN_FULLDATE)).toEqual([false, false]);

    const lowerThanMinDate = new InternalDate({ value: MIN_FULLDATE }).shiftYear(-1).toString();
    const higherThanMaxDate = new InternalDate({ value: MAX_FULLDATE }).shiftYear(1).toString();

    expect(validate(lowerThanMinDate, MAX_FULLDATE)).toEqual([false, true]);
    expect(validate(MIN_FULLDATE, higherThanMaxDate)).toEqual([true, false]);
  });

  it('should validate by limits', () => {
    expect(validate('01.01.1900', '01.01.2020', { minDate: '01.01.1950' })).toEqual([false, true]);
    expect(validate('01.01.1900', '01.01.2020', { maxDate: '01.01.2000' })).toEqual([true, false]);
  });

  it('should validate by value', () => {
    expect(validate('01.ff.2019', '01.11.2030')).toEqual([false, true]);
    expect(validate('01.11.2030', '2')).toEqual([false, false]);
    expect(validate('32.12.2000', '30.02.2020')).toEqual([false, false]);
  });

  it('should validate by optional (allowEmpty)', () => {
    expect(validate('', '')).toEqual([false, false]);
    expect(validate('', '', { startOptional: true, endOptional: true })).toEqual([true, true]);
    expect(validate('', '', { startOptional: false, endOptional: false })).toEqual([false, false]);
    expect(validate('', '10.10.2020', { startOptional: true })).toEqual([true, true]);
    expect(validate('', '10.10.2020')).toEqual([false, true]);
    expect(validate('10.10.2020', '', { endOptional: true })).toEqual([true, true]);
    expect(validate('10.10.2020', '')).toEqual([true, false]);
  });
});
