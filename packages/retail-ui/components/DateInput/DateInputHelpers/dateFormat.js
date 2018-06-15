

export const parseValue = (
  value: ?string
): { date: ?string, month: ?string, year: ?string } => {
  const re = /(\d{1,2})?\.?(\d{1,2})?\.?(\d{1,4})?/;
  const match = re.exec(value || '');
  const [date = null, month = null, year = null] = match.slice(1);
  return { date, month, year };
};

export const formatDate = (date: ?string, month: ?string, year: ?string) => {
  const value = `${date || ''}.${month || ''}.${year || ''}`;
  return trimTrailingDots(value);
};

const trimTrailingDots = (value: string) => value.replace(/\.*$/, '');
