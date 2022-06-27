import { isNonNullable } from '../utils';

const nullishValues = [null, undefined];
const falsyValues = [false, 0, -0, '', NaN];

describe('isNonNullable', () => {
  it.each(nullishValues)('%j returns false', (value) => {
    expect(isNonNullable(value)).toBe(false);
  });

  it.each(falsyValues)('%j returns true', (value) => {
    expect(isNonNullable(value)).toBe(true);
  });
});
