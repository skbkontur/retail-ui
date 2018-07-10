import { deepClone } from '../deepClone';

test('it clones object', () => {
  const obj = { a: 1 };
  const clone = deepClone(obj);
  expect(clone).toEqual(obj);
});

test('it creates new object', () => {
  const obj = { a: 1 };
  const clone = deepClone(obj);
  expect(clone).not.toBe(obj);
});

test('it creates new objects recursively', () => {
  const obj = { a: { b: 2 } };
  const clone = deepClone(obj);
  expect(clone).not.toBe(obj);
  expect(clone.a).not.toBe(obj.a);
});

test('it clones arrays', () => {
  const obj = [1, 2, 3];
  const clone = deepClone(obj);
  expect(clone).not.toBe(obj);
  expect(clone).toEqual(obj);
});

test('it create new objects in cloned arrays', () => {
  const obj = [{ a: 1 }, { b: 2 }];
  const clone = deepClone(obj);
  expect(clone).toEqual(obj);

  expect(clone[0]).not.toBe(obj[0]);
  expect(clone[1]).not.toBe(obj[1]);
});
