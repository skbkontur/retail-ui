import { getItems } from '../PagingHelper';

type NumberTuple = [number, number];
type ExpectingArray = string | number;
type CasesTuple = [NumberTuple, ExpectingArray[]];

const cases: CasesTuple[] = [
  [[1, 1], [1]],
  [
    [1, 7],
    [1, 2, 3, 4, 5, 6, 7],
  ],
  [
    [1, 10],
    [1, 2, 3, 4, 5, '.', 10],
  ],
  [
    [6, 12],
    [1, '.', 4, 5, 6, 7, 8, '.', 12],
  ],
  [
    [8, 12],
    [1, '.', 6, 7, 8, 9, 10, 11, 12],
  ],
];

cases.forEach(([[active, total], expecting]) => {
  it(`Active: ${active}; Total: ${total}`, () => {
    expect(getItems(active, total)).toEqual(expecting);
  });
});
