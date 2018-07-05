import { deepMerge } from '../deepMerge';

test('merging two objects', () => {
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const result = deepMerge(obj1, obj2);
  expect(result.a).toBe(1);
  expect(result.b).toBe(2);
});

test('new objected created after merge', () => {
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const result = deepMerge(obj1, obj2);
  expect(result).not.toBe(obj1);
  expect(result).not.toBe(obj2);
});

test('second object properties have more priority', () => {
  const obj1 = { a: 1 };
  const obj2 = { a: 2 };
  const result = deepMerge(obj1, obj2);
  expect(result.a).toBe(2);
});

test('merges two objects deeply', () => {
  const obj1 = { a: { b: 1 } };
  const obj2 = { a: { c: 2 } };
  const result = deepMerge(obj1, obj2);
  expect(result.a.b).toBe(1);
  expect(result.a.c).toBe(2);
});

test('merges two objects immutable', () => {
  const obj1 = { a: { b: 1 } };
  const obj2 = { a: { c: 2 } };
  Object.freeze(obj1.a);
  const result = deepMerge(obj1, obj2);
  expect(obj1.a).toEqual({ b: 1 });
  expect(result.a.c).toBe(2);
});
