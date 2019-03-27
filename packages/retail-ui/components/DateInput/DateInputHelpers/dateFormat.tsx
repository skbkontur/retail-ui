import { Nullable } from '../../../typings/utility-types';

export const parseValue = (
  value: Nullable<string>,
): { date: string | null; month: string | null; year: string | null } => {
  const re = /(\d{1,2})?\.?(\d{1,2})?\.?(\d{1,4})?/;
  const match = re.exec(value || '');
  if (!match) {
    return {
      date: null,
      month: null,
      year: null,
    };
  }
  const [date = null, month = null, year = null] = match.slice(1);
  return { date, month, year };
};

export const formatDate = (date: Nullable<string>, month: Nullable<string>, year: Nullable<string>) => {
  const value = `${date || ''}.${month || ''}.${year || ''}`;
  return trimTrailingDots(value);
};

const trimTrailingDots = (value: string) => value.replace(/\.*$/, '');
