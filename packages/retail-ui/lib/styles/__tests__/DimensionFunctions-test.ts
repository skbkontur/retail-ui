import DimensionFunctions from '../DimensionFunctions';

describe('DimensionFunctions.shift helper', () => {
  test('shifts `px` value', () => {
    const actual = DimensionFunctions.shift('5px', '-1');

    expect(actual).toBe('4px');
  });

  test('shifts `em` value', () => {
    const actual = DimensionFunctions.shift('5em', '-1');

    expect(actual).toBe('4em');
  });

  test('shifts `rem` value', () => {
    const actual = DimensionFunctions.shift('5rem', '1');

    expect(actual).toBe('6rem');
  });

  test('shifts `vh` value', () => {
    const actual = DimensionFunctions.shift('5vh', '10');

    expect(actual).toBe('15vh');
  });

  test('shifts `vw` value', () => {
    const actual = DimensionFunctions.shift('5vw', '0');

    expect(actual).toBe('5vw');
  });

  test('shifts `%` value', () => {
    const actual = DimensionFunctions.shift('50%', '5');

    expect(actual).toBe('55%');
  });

  test('does not shift falsy values', () => {
    // @ts-ignore
    const emptyString = DimensionFunctions.shift(0, '5');
    expect(emptyString).toBe(0);

    // @ts-ignore
    const nullValue = DimensionFunctions.shift(null, '5');
    expect(nullValue).toBeNull();

    // @ts-ignore
    const undefinedValue = DimensionFunctions.shift(undefined, '5');
    expect(undefinedValue).toBeUndefined();

    // @ts-ignore
    const NaNValue = DimensionFunctions.shift(NaN, '5');
    expect(NaNValue).toBeNaN();

    const actual = DimensionFunctions.shift('', '5');
    expect(actual).toEqual('');
  });

  test('does not shift if no shift passed', () => {
    // @ts-ignore
    const actual = DimensionFunctions.shift('50px');
    expect(actual).toBe('50px');
  });
});
