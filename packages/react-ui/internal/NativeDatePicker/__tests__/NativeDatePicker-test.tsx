import { CalendarDateShape } from '../../../internal/Calendar';
import { getDateForNative, getDateForComponent, getNativeDateFromShape, getShapeFromNativeDate } from '../utils';

describe('NativeDatePikcer', () => {
  it('get correct native date input string (YYYY-MM-DD) from value format (DD.MM.YYYY)', () => {
    const value = '01.02.2020';
    const convertedDate = getDateForNative(value);

    expect(convertedDate).toBe('2020-02-01');
  });

  it('get correct DatePicker string (DD.MM.YYYY) from native value format (YYYY-MM-DD)', () => {
    const value = '2020-02-01';
    const convertedDate = getDateForComponent(value);

    expect(convertedDate).toBe('01.02.2020');
  });

  it('get correct native date input string (YYYY-MM-DD) from DateShape object', () => {
    const date: CalendarDateShape = { year: 2020, month: 2, date: 1 };
    const date2 = { ...date, year: 900 };
    const date3 = { ...date, year: 50 };
    const date4 = { ...date, year: 5 };

    const dates: CalendarDateShape[] = [date, date2, date3, date4];
    const expectedDates = ['2020-02-01', '0900-02-01', '0050-02-01', '0005-02-01'];
    const convertedDates = dates.map(date => getNativeDateFromShape(date));

    convertedDates.forEach((date, index) => expect(date).toBe(expectedDates[index]));
  });

  it('get correct DateShape object from native value format (YYYY-MM-DD)', () => {
    const value = '2020-02-01';
    const value2 = '0020-02-01';
    const convertedDate = getShapeFromNativeDate(value);
    const convertedDate2 = getShapeFromNativeDate(value2);

    expect(convertedDate).toEqual({ year: 2020, month: 2, date: 1 });
    expect(convertedDate2).toEqual({ year: 20, month: 2, date: 1 });
  });
});
