// @flow
import PagingHelper from '../PagingHelper';

describe('PagingHelper.getItems', () => {
  it('single page', () => {
    const items = PagingHelper.getItems(1, 1);
    expect(items).toEqual([1]);
  });

  it('seven pages', () => {
    const items = PagingHelper.getItems(1, 7);
    expect(items).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
