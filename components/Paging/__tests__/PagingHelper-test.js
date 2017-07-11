// @flow
import PagingHelper from '../PagingHelper';

const cases = [
  ['single page', [1, 1], [1]],
  ['seven pages', [1, 7], [1, 2, 3, 4, 5, 6, 7]],
  ['ten pages', [1, 10], [1, 2, 3, 4, 5, '.', 10]]
];

describe('PagingHelper.getItems', () => {
  cases.forEach(([name, args, expecting]) => {
    it(name, () => {
      expect(PagingHelper.getItems(...args)).toEqual(expecting);
    });
  });
});
