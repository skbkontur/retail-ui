import { extractFromObject } from '../utils';

describe('extractFromObject', () => {
  it('correctly extracts properties when name is accessed', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const predicate = ([name]: [string, number]) => name !== 'd';

    expect(extractFromObject(obj, predicate)).toEqual({ a: 1, b: 2, c: 3, e: 5 });
  });

  it('correctly extracts properties when value is accessed', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const predicate = ([_, value]: [string, number]) => value > 2;

    expect(extractFromObject(obj, predicate)).toEqual({ c: 3, d: 4, e: 5 });
  });
});
