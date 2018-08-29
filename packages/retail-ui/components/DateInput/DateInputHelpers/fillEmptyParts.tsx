import { Nullable } from '../../../typings/utility-types';

interface DateShape {
  date: Nullable<string>;
  month: Nullable<string>;
  year: Nullable<string>;
}

const padNumber = (num: number | string, length: number, mask: string) =>
  num.toString().padStart(length, mask);

export function fillEmptyParts(
  { date, month, year }: DateShape,
  now: Date = new Date()
) {
  return {
    date: padNumber(date || now.getDate(), 2, '0'),
    month: padNumber(month || now.getMonth() + 1, 2, '0'),
    year: padNumber(year || now.getFullYear(), 2, '0')
  };
}
