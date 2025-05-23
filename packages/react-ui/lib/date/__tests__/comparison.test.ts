import { isBetween, isEqual, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../comparison';

test('isEqual returns true on same dates', () => {
  expect(isEqual('10.03.2017', '10.03.2017')).toBe(true);
});

test('isEqual returns false on different dates', () => {
  expect(isEqual('10.03.2017', '11.03.2017')).toBe(false);
});

test.each([
  ['10.03.2017', '11.03.2017'],
  ['10.03.2017', '10.04.2017'],
  ['10.03.2017', '10.03.2018'],
])('isLess returns true if "%s" is before "%s"', (date1, date2) => {
  expect(isLess(date1, date2)).toBe(true);
});

test.each([
  ['10.03.2017', '9.03.2017'],
  ['10.03.2017', '10.02.2017'],
  ['10.03.2017', '10.03.2016'],
  ['10.03.2017', '10.03.2017'],
])('isLess returns false if "%s" is after or equal "%s"', (date1, date2) => {
  expect(isLess(date1, date2)).toBe(false);
});

test.each([
  ['10.03.2017', '11.03.2017'],
  ['10.03.2017', '10.04.2017'],
  ['10.03.2017', '10.03.2018'],
  ['10.03.2017', '10.03.2017'],
])('isLessOrEqual returns true if "%s" is before or equal "%s', (date1, date2) => {
  expect(isLessOrEqual(date1, date2)).toBe(true);
});

test.each([
  ['10.03.2017', '9.03.2017'],
  ['10.03.2017', '10.02.2017'],
  ['10.03.2017', '10.03.2016'],
])('isLessOrEqual returns false if "%s" is after "%s"', (date1, date2) => {
  expect(isLessOrEqual(date1, date2)).toBe(false);
});

test.each([
  ['10.03.2017', '11.03.2017'],
  ['10.03.2017', '10.04.2017'],
  ['10.03.2017', '10.03.2018'],
  ['10.03.2017', '10.03.2017'],
])('isGreater returns false if "%s" is before or equal "%s"', (date1, date2) => {
  expect(isGreater(date1, date2)).toBe(false);
});

test.each([
  ['10.03.2017', '9.03.2017'],
  ['10.03.2017', '10.02.2017'],
  ['10.03.2017', '10.03.2016'],
])('isGreater returns true if "%s" is after "%s"', (date1, date2) => {
  expect(isGreater(date1, date2)).toBe(true);
});

test.each([
  ['10.03.2017', '11.03.2017'],
  ['10.03.2017', '10.04.2017'],
  ['10.03.2017', '10.03.2018'],
])('isGreaterOrEqual returns false if "%s" is before "%s"', (date1, date2) => {
  expect(isGreaterOrEqual(date1, date2)).toBe(false);
});

test.each([
  ['10.03.2017', '9.03.2017'],
  ['10.03.2017', '10.02.2017'],
  ['10.03.2017', '10.03.2016'],
  ['10.03.2017', '10.03.2017'],
])('isGreaterOrEqual returns true if "%s" is after or equal "%s"', (date1, date2) => {
  expect(isGreaterOrEqual(date1, date2)).toBe(true);
});

test.each([
  ['10.03.2017', '9.03.2017', '11.03.2017'],
  ['10.03.2017', '10.02.2017', '10.04.2017'],
  ['10.03.2017', '10.03.2016', '10.03.2018'],
  ['10.03.2017', '10.03.2016', undefined],
  ['10.03.2017', undefined, '10.03.2018'],
])('isBetween returns true if "%s" is between "%s" and "%s"', (date, left, right) => {
  expect(isBetween(date, left, right)).toBe(true);
});

test.each([
  ['10.03.2017', '11.03.2017', '12.03.2017'],
  ['10.03.2017', '10.04.2017', '10.05.2017'],
  ['10.03.2017', '10.03.2015', '10.03.2016'],
  ['10.03.2017', '11.03.2017', undefined],
  ['10.03.2017', undefined, '10.03.2016'],
])('isBetween returns false if "%s" is not between "%s" and "%s"', (date, left, right) => {
  expect(isBetween(date, left, right)).toBe(false);
});
