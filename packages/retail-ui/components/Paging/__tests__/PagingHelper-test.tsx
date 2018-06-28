
import PagingHelper from '../PagingHelper';

[
  [[1, 1], [1]],
  [[1, 7], [1, 2, 3, 4, 5, 6, 7]],
  [[1, 10], [1, 2, 3, 4, 5, '.', 10]],
  [[6, 12], [1, '.', 4, 5, 6, 7, 8, '.', 12]],
  [[8, 12], [1, '.', 6, 7, 8, 9, 10, 11, 12]]
].forEach(([[active, total], expecting]) => {
  it(`Active: ${active}; Total: ${total}`, () => {
    expect(PagingHelper.getItems(active, total)).toEqual(expecting);
  });
});
