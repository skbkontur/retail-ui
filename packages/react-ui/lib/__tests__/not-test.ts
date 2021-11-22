import { not } from '../utils';

describe('not', () => {
  it('inverts action of the function', () => {
    const isTrue = (value: boolean) => value === true;
    const isFalse = not(isTrue);

    const value = true;

    expect(isTrue(value)).toBe(true);
    expect(isFalse(value)).toBe(false);
  });
});
