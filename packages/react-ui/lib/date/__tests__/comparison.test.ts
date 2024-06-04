import { isBetween, isEqual, isGreater, isGreaterOrEqual, isLess, isLessOrEqual } from '../comparison';

test('isEqual returns true on same dates', () => {
  expect(isEqual('10.03.2017', '10.03.2017')).toBe(true);
});

test('isEqual returns false on different dates', () => {
  expect(isEqual('10.03.2017', '11.03.2017')).toBe(false);
});

test('isLess returns true if date is before given', () => {
  const cases = [
    ['10.03.2017', '11.03.2017'],
    ['10.03.2017', '10.04.2017'],
    ['10.03.2017', '10.03.2018'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isLess(date1, date2)).toBe(true);
  });
});

test('isLess returns false if date is after or equal given', () => {
  const cases = [
    ['10.03.2017', '9.03.2017'],
    ['10.03.2017', '10.02.2017'],
    ['10.03.2017', '10.03.2016'],
    ['10.03.2017', '10.03.2017'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isLess(date1, date2)).toBe(false);
  });
});

test('isLessOrEqual returns true if date is before or equal given', () => {
  const cases = [
    ['10.03.2017', '11.03.2017'],
    ['10.03.2017', '10.04.2017'],
    ['10.03.2017', '10.03.2018'],
    ['10.03.2017', '10.03.2017'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isLessOrEqual(date1, date2)).toBe(true);
  });
});

test('isLessOrEqual returns false if date is after given', () => {
  const cases = [
    ['10.03.2017', '9.03.2017'],
    ['10.03.2017', '10.02.2017'],
    ['10.03.2017', '10.03.2016'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isLessOrEqual(date1, date2)).toBe(false);
  });
});

test('isGreater returns false if date is before or equal given', () => {
  const cases = [
    ['10.03.2017', '11.03.2017'],
    ['10.03.2017', '10.04.2017'],
    ['10.03.2017', '10.03.2018'],
    ['10.03.2017', '10.03.2017'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isGreater(date1, date2)).toBe(false);
  });
});

test('isGreater returns true if date is after given', () => {
  const cases = [
    ['10.03.2017', '9.03.2017'],
    ['10.03.2017', '10.02.2017'],
    ['10.03.2017', '10.03.2016'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isGreater(date1, date2)).toBe(true);
  });
});

test('isGreaterOrEqual returns false if date is before given', () => {
  const cases = [
    ['10.03.2017', '11.03.2017'],
    ['10.03.2017', '10.04.2017'],
    ['10.03.2017', '10.03.2018'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isGreaterOrEqual(date1, date2)).toBe(false);
  });
});

test('isGreaterOrEqual returns true if date is after or equal given', () => {
  const cases = [
    ['10.03.2017', '9.03.2017'],
    ['10.03.2017', '10.02.2017'],
    ['10.03.2017', '10.03.2016'],
    ['10.03.2017', '10.03.2017'],
  ];

  cases.forEach(([date1, date2]) => {
    expect(isGreaterOrEqual(date1, date2)).toBe(true);
  });
});

test('isBetween returns true if date is between given', () => {
  const cases: Array<[string, string?, string?]> = [
    ['10.03.2017', '9.03.2017', '11.03.2017'],
    ['10.03.2017', '10.02.2017', '10.04.2017'],
    ['10.03.2017', '10.03.2016', '10.03.2018'],
    ['10.03.2017', '10.03.2016', undefined],
    ['10.03.2017', undefined, '10.03.2018'],
  ];

  cases.forEach(([date, left, right]) => {
    expect(isBetween(date, left, right)).toBe(true);
  });
});

test('isBetween returns false if date is not between given', () => {
  const cases: Array<[string, string?, string?]> = [
    ['10.03.2017', '11.03.2017', '12.03.2017'],
    ['10.03.2017', '10.04.2017', '10.05.2017'],
    ['10.03.2017', '10.03.2015', '10.03.2016'],
    ['10.03.2017', '11.03.2017', undefined],
    ['10.03.2017', undefined, '10.03.2016'],
  ];

  cases.forEach(([date, left, right]) => {
    expect(isBetween(date, left, right)).toBe(false);
  });
});
