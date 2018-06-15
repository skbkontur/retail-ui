

type DateShape = {
  +date: ?string,
  +month: ?string,
  +year: ?string
};

const padNumber = (num, length, mask) => num.toString().padStart(length, mask);

export function fillEmptyParts(
  { date, month, year }: DateShape,
  now: Date = new Date()
) {
  return {
    date: date || padNumber(now.getDate(), 2, '0'),
    month: month || padNumber(now.getMonth() + 1, 2, '0'),
    year: year || padNumber(now.getFullYear(), 2, '0')
  };
}
