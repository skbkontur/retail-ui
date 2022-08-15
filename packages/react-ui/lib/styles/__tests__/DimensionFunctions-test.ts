import { shift } from '../DimensionFunctions';

describe('DimensionFunctions.shift helper', () => {
  test('shifts `px` value', () => {
    const actual = shift('5px', '-1');

    expect(actual).toBe('4px');
  });

  test('shifts `em` value', () => {
    const actual = shift('5em', '-1');

    expect(actual).toBe('4em');
  });

  test('shifts `rem` value', () => {
    const actual = shift('5rem', '1');

    expect(actual).toBe('6rem');
  });

  test('shifts `vh` value', () => {
    const actual = shift('5vh', '10');

    expect(actual).toBe('15vh');
  });

  test('shifts `vw` value', () => {
    const actual = shift('5vw', '0');

    expect(actual).toBe('5vw');
  });

  test('shifts `%` value', () => {
    const actual = shift('50%', '5');

    expect(actual).toBe('55%');
  });

  test('does not shift falsy values', () => {
    // @ts-expect-error: wrong type of value used for testing purposes.
    const emptyString = shift(0, '5');
    expect(emptyString).toBe(0);

    // @ts-expect-error: wrong type of value used for testing purposes.
    const nullValue = shift(null, '5');
    expect(nullValue).toBeNull();

    // @ts-expect-error: wrong type of value used for testing purposes.
    const undefinedValue = shift(undefined, '5');
    expect(undefinedValue).toBeUndefined();

    // @ts-expect-error: wrong type of value used for testing purposes.
    const NaNValue = shift(NaN, '5');
    expect(NaNValue).toBeNaN();

    const actual = shift('', '5');
    expect(actual).toBe('');
  });
});
