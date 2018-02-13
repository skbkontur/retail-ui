// @flow

import { createMonth, getMonthIndex, getYear } from '../Month';

test('createMonth creates month', () => {
  const month = createMonth(0, 1900);
  expect(getMonthIndex(month)).toBe(0);
  expect(getYear(month)).toBe(1900);
});

test('createMonth creates month with monthIndex = -1', () => {
  const month = createMonth(-1, 1900);
  expect(getMonthIndex(month)).toBe(11);
  expect(getYear(month)).toBe(1899);
});

test('createMonth creates month with monthIndex = -120', () => {
  const month = createMonth(-120, 1900);
  expect(getMonthIndex(month)).toBe(0);
  expect(getYear(month)).toBe(1890);
});

test('createMonth creates month with monthIndex = -122', () => {
  const month = createMonth(-122, 1900);
  expect(getMonthIndex(month)).toBe(10);
  expect(getYear(month)).toBe(1889);
});

test('createMonth creates month with monthIndex = 11', () => {
  const month = createMonth(13, 1900);
  expect(getMonthIndex(month)).toBe(1);
  expect(getYear(month)).toBe(1901);
});

test('createMonth creates month with monthIndex = 120', () => {
  const month = createMonth(120, 1900);
  expect(getMonthIndex(month)).toBe(0);
  expect(getYear(month)).toBe(1910);
});

test('createMonth creates month with monthIndex = 125', () => {
  const month = createMonth(125, 1900);
  expect(getMonthIndex(month)).toBe(5);
  expect(getYear(month)).toBe(1910);
});
