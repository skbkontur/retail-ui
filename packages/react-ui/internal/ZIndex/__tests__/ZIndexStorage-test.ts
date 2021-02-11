import { globalThat } from '../../../lib/SSRSafe';
import { incrementZIndex, removeZIndex } from '../ZIndexStorage';

const setZIndexes = (indexes: number[]) => (globalThat.__RetailUiZIndexes = indexes);

beforeEach(() => setZIndexes([]));

describe('removeZIndex', () => {
  it('should remove value if value exists', () => {
    setZIndexes([1, 2, 3]);
    removeZIndex(3);

    expect(globalThat.__RetailUiZIndexes).toEqual([1, 2]);
  });

  it('should not change array if value does not exist', () => {
    setZIndexes([1, 2, 3]);
    removeZIndex(4);

    expect(globalThat.__RetailUiZIndexes).toEqual([1, 2, 3]);
  });

  it('should removes just first value', () => {
    setZIndexes([1, 2, 2, 3]);
    removeZIndex(2);

    expect(globalThat.__RetailUiZIndexes).toEqual([1, 2, 3]);
  });

  it('should not change empty array', () => {
    removeZIndex(2);

    expect(globalThat.__RetailUiZIndexes).toEqual([]);
  });
});

describe('incrementZindex', () => {
  [
    {
      storage: [10, 20, 30, 40, 1000],
      priority: 0,
      expected: { result: 50, storage: [10, 20, 30, 40, 50, 1000] },
    },
    {
      storage: [10, 20, 30, 40, 1000, 2000],
      priority: 2,
      expected: { result: 2010, storage: [10, 20, 30, 40, 1000, 2000, 2010] },
    },
    {
      storage: [1000, 1999, 3000, 3999],
      priority: 2,
      expected: { result: 2000, storage: [1000, 1999, 2000, 3000, 3999] },
    },
    {
      storage: [1000, 1999, 2000, 3000, 3999],
      priority: 2,
      expected: { result: 2010, storage: [1000, 1999, 2000, 2010, 3000, 3999] },
    },
    {
      storage: [10, 20, 30, 40, 1000, 2000],
      priority: 1,
      expected: { result: 1010, storage: [10, 20, 30, 40, 1000, 1010, 2000] },
    },
    {
      storage: [1990, 2000],
      priority: 1,
      expected: { result: 1999, storage: [1990, 1999, 2000] },
    },
    {
      storage: [1000, 1999, 2000],
      priority: 1,
      expected: { result: 1999, storage: [1000, 1999, 1999, 2000] },
    },
    {
      storage: [1000, 1999, 2000],
      priority: 1,
      expected: { result: 1999, storage: [1000, 1999, 1999, 2000] },
    },
    {
      storage: [1999, 2000],
      priority: 1,
      expected: { result: 1999, storage: [1999, 1999, 2000] },
    },
    {
      storage: [],
      priority: 0,
      expected: { result: 0, storage: [0] },
    },
    {
      storage: [],
      priority: 9,
      expected: { result: 9000, storage: [9000] },
    },
    {
      storage: [1000, 1010, 1980],
      priority: 1,
      expected: { result: 1990, storage: [1000, 1010, 1980, 1990] },
    },
  ].forEach(testData => {
    const { storage, expected, priority, delta } = { ...testData, delta: 10 };

    it(`should create ZIndex with priority=${priority} in storage=[${storage}]`, () => {
      setZIndexes(storage);
      const result = incrementZIndex(priority, delta);

      expect(result).toBe(expected.result);
      expect(globalThat.__RetailUiZIndexes).toEqual(expected.storage);
    });
  });
});
