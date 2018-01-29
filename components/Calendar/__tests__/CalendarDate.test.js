// @flow

import { CalendarDate } from '../CalendarDate';

test('CalendarDate.create creates given date', () => {
  const date = CalendarDate.create(10, 3, 2017);
  expect(date).toBeInstanceOf(CalendarDate);
  expect(date.date).toBe(10);
  expect(date.month).toBe(3);
  expect(date.year).toBe(2017);
});

test('CalendarDate.prototype.setDate returns new CalendarDate with given date', () => {
  const date = CalendarDate.create(10, 3, 2017);
  const newDate = date.setDate(20);
  expect(newDate).toBeInstanceOf(CalendarDate);
  expect(newDate.date).toBe(20);
  expect(newDate.month).toBe(3);
  expect(newDate.year).toBe(2017);
});

test('CalendarDate.prototype.setDate returns new CalendarDate immutably', () => {
  const date = CalendarDate.create(10, 3, 2017);
  date.setDate(20);
  expect(date.date).toBe(10);
  expect(date.month).toBe(3);
  expect(date.year).toBe(2017);
});

test('CalendarDate.prototype.setMonth returns new CalendarDate with given month', () => {
  const date = CalendarDate.create(10, 3, 2017);
  const newDate = date.setMonth(10);
  expect(newDate).toBeInstanceOf(CalendarDate);
  expect(newDate.date).toBe(10);
  expect(newDate.month).toBe(10);
  expect(newDate.year).toBe(2017);
});

test('CalendarDate.prototype.setMonth returns new CalendarDate immutably', () => {
  const date = CalendarDate.create(10, 3, 2017);
  date.setMonth(10);
  expect(date.date).toBe(10);
  expect(date.month).toBe(3);
  expect(date.year).toBe(2017);
});

test('CalendarDate.prototype.setYear returns new CalendarDate with given year', () => {
  const date = CalendarDate.create(10, 3, 2017);
  const newDate = date.setYear(2018);
  expect(newDate).toBeInstanceOf(CalendarDate);
  expect(newDate.date).toBe(10);
  expect(newDate.month).toBe(3);
  expect(newDate.year).toBe(2018);
});

test('CalendarDate.prototype.setYear returns new CalendarDate immutably', () => {
  const date = CalendarDate.create(10, 3, 2017);
  date.setYear(2018);
  expect(date.date).toBe(10);
  expect(date.month).toBe(3);
  expect(date.year).toBe(2017);
});

test('CalendarDate.prototype.isEqual returns true on same dates', () => {
  const date1 = CalendarDate.create(10, 3, 2017);
  const date2 = CalendarDate.create(10, 3, 2017);
  expect(date1.isEqual(date2)).toBe(true);
});

test('CalendarDate.prototype.isEqual returns false on different dates', () => {
  const date1 = CalendarDate.create(10, 3, 2017);
  const date2 = CalendarDate.create(10, 4, 2017);
  expect(date1.isEqual(date2)).toBe(false);
});

test('CalendarDate.prototype.isLess returns true if date is before given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2018]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isLess(date2)).toBe(true);
    });
});

test('CalendarDate.prototype.isLess returns false if date is after or equal given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017]],
    [[10, 3, 2017], [10, 3, 2016]],
    [[10, 3, 2017], [10, 3, 2017]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isLess(date2)).toBe(false);
    });
});

test('CalendarDate.prototype.isLessOrEqual returns true if date is before or equal given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2018]],
    [[10, 3, 2017], [10, 3, 2017]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isLessOrEqual(date2)).toBe(true);
    });
});

test('CalendarDate.prototype.isLessOrEqual returns false if date is after given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017]],
    [[10, 3, 2017], [10, 3, 2016]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isLessOrEqual(date2)).toBe(false);
    });
});

test('CalendarDate.prototype.isGreater returns false if date is before or equal given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2018]],
    [[10, 3, 2017], [10, 3, 2017]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isGreater(date2)).toBe(false);
    });
});

test('CalendarDate.prototype.isGreater returns true if date is after given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017]],
    [[10, 3, 2017], [10, 3, 2016]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isGreater(date2)).toBe(true);
    });
});

test('CalendarDate.prototype.isGreaterOrEqual returns false if date is before given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2018]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isGreaterOrEqual(date2)).toBe(false);
    });
});

test('CalendarDate.prototype.isGreaterOrEqual returns true if date is after or equal given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017]],
    [[10, 3, 2017], [10, 3, 2016]],
    [[10, 3, 2017], [10, 3, 2017]]
  ];

  cases
    .map(x => x.map(y => CalendarDate.create(...y)))
    .forEach(([date1, date2]) => {
      expect(date1.isGreaterOrEqual(date2)).toBe(true);
    });
});

test('CalendarDate.prototype.isBetween returns true if date is between given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2016], [10, 3, 2018]],
    [[10, 3, 2017], [10, 3, 2016], null],
    [[10, 3, 2017], null, [10, 3, 2018]]
  ];

  cases
    .map(([date, left, right]) => [
      CalendarDate.create(...date),
      left && CalendarDate.create(...left),
      right && CalendarDate.create(...right)
    ])
    .forEach(([date, left, right]) => {
      expect(date.isBetween(left, right)).toBe(true);
    });
});

test('CalendarDate.prototype.isBetween returns false if date is not between given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017], [12, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017], [10, 5, 2017]],
    [[10, 3, 2017], [10, 3, 2015], [10, 3, 2016]],
    [[10, 3, 2017], [11, 3, 2017], null],
    [[10, 3, 2017], null, [10, 3, 2016]]
  ];

  cases
    .map(([date, left, right]) => [
      CalendarDate.create(...date),
      left && CalendarDate.create(...left),
      right && CalendarDate.create(...right)
    ])
    .forEach(([date, left, right]) => {
      expect(date.isBetween(left, right)).toBe(false);
    });
});
