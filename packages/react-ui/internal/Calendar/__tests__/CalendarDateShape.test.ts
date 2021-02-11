import * as CDS from '../CalendarDateShape';

test('CDS.create creates given date', () => {
  const date = CDS.create(10, 3, 2017);
  expect(date.date).toBe(10);
  expect(date.month).toBe(3);
  expect(date.year).toBe(2017);
});

test('CDS.isEqual returns true on same dates', () => {
  const date1 = CDS.create(10, 3, 2017);
  const date2 = CDS.create(10, 3, 2017);
  expect(CDS.isEqual(date1, date2)).toBe(true);
});

test('CDS.isEqual returns false on different dates', () => {
  const date1 = CDS.create(10, 3, 2017);
  const date2 = CDS.create(10, 4, 2017);
  expect(CDS.isEqual(date1, date2)).toBe(false);
});

test('CDS.isLess returns true if date is before given', () => {
  const cases = [[[10, 3, 2017], [11, 3, 2017]], [[10, 3, 2017], [10, 4, 2017]], [[10, 3, 2017], [10, 3, 2018]]];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isLess(date1, date2)).toBe(true);
  });
});

test('CDS.isLess returns false if date is after or equal given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017]],
    [[10, 3, 2017], [10, 3, 2016]],
    [[10, 3, 2017], [10, 3, 2017]],
  ];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isLess(date1, date2)).toBe(false);
  });
});

test('CDS.isLessOrEqual returns true if date is before or equal given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2018]],
    [[10, 3, 2017], [10, 3, 2017]],
  ];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isLessOrEqual(date1, date2)).toBe(true);
  });
});

test('CDS.isLessOrEqual returns false if date is after given', () => {
  const cases = [[[10, 3, 2017], [9, 3, 2017]], [[10, 3, 2017], [10, 2, 2017]], [[10, 3, 2017], [10, 3, 2016]]];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isLessOrEqual(date1, date2)).toBe(false);
  });
});

test('CDS.isGreater returns false if date is before or equal given', () => {
  const cases = [
    [[10, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2018]],
    [[10, 3, 2017], [10, 3, 2017]],
  ];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isGreater(date1, date2)).toBe(false);
  });
});

test('CDS.isGreater returns true if date is after given', () => {
  const cases = [[[10, 3, 2017], [9, 3, 2017]], [[10, 3, 2017], [10, 2, 2017]], [[10, 3, 2017], [10, 3, 2016]]];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isGreater(date1, date2)).toBe(true);
  });
});

test('CDS.isGreaterOrEqual returns false if date is before given', () => {
  const cases = [[[10, 3, 2017], [11, 3, 2017]], [[10, 3, 2017], [10, 4, 2017]], [[10, 3, 2017], [10, 3, 2018]]];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isGreaterOrEqual(date1, date2)).toBe(false);
  });
});

test('CDS.isGreaterOrEqual returns true if date is after or equal given', () => {
  const cases = [
    [[10, 3, 2017], [9, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017]],
    [[10, 3, 2017], [10, 3, 2016]],
    [[10, 3, 2017], [10, 3, 2017]],
  ];

  cases.map(x => x.map(y => CDS.create(y[0], y[1], y[2]))).forEach(([date1, date2]) => {
    expect(CDS.isGreaterOrEqual(date1, date2)).toBe(true);
  });
});

test('CDS.isBetween returns true if date is between given', () => {
  const cases: Array<[[number, number, number], [number, number, number] | null, [number, number, number] | null]> = [
    [[10, 3, 2017], [9, 3, 2017], [11, 3, 2017]],
    [[10, 3, 2017], [10, 2, 2017], [10, 4, 2017]],
    [[10, 3, 2017], [10, 3, 2016], [10, 3, 2018]],
    [[10, 3, 2017], [10, 3, 2016], null],
    [[10, 3, 2017], null, [10, 3, 2018]],
  ];

  cases
    .map(
      ([date, left, right]): [CDS.CalendarDateShape, CDS.CalendarDateShape | null, CDS.CalendarDateShape | null] => [
        CDS.create(date[0], date[1], date[2]),
        left && CDS.create(left[0], left[1], left[2]),
        right && CDS.create(right[0], right[1], right[2]),
      ],
    )
    .forEach(([date, left, right]) => {
      expect(CDS.isBetween(date, left, right)).toBe(true);
    });
});

test('CDS.isBetween returns false if date is not between given', () => {
  const cases: Array<[[number, number, number], [number, number, number] | null, [number, number, number] | null]> = [
    [[10, 3, 2017], [11, 3, 2017], [12, 3, 2017]],
    [[10, 3, 2017], [10, 4, 2017], [10, 5, 2017]],
    [[10, 3, 2017], [10, 3, 2015], [10, 3, 2016]],
    [[10, 3, 2017], [11, 3, 2017], null],
    [[10, 3, 2017], null, [10, 3, 2016]],
  ];

  cases
    .map(
      ([date, left, right]): [CDS.CalendarDateShape, CDS.CalendarDateShape | null, CDS.CalendarDateShape | null] => [
        CDS.create(date[0], date[1], date[2]),
        left && CDS.create(left[0], left[1], left[2]),
        right && CDS.create(right[0], right[1], right[2]),
      ],
    )
    .forEach(([date, left, right]) => {
      expect(CDS.isBetween(date, left, right)).toBe(false);
    });
});
