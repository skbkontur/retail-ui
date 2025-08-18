import { getItems } from '../PagingHelper';

type NumberTuple = [number, number];
type ExpectingArray = string | number;
type CasesTuple = [NumberTuple, ExpectingArray[]];

const desktopCases: CasesTuple[] = [
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

const mobileCases: CasesTuple[] = [
  [[1, 1], [1]],
  [
    [1, 5],
    [1, 2, 3, 4, 5],
  ],
  [
    [1, 7],
    [1, 2, 3, '.', 7],
  ],
  [
    [4, 8],
    [1, 2, 3, 4, 5, '.', 8],
  ],
  [
    [5, 8],
    [1, '.', 4, 5, 6, 7, 8],
  ],
  [
    [6, 12],
    [1, '.', 5, 6, 7, '.', 12],
  ],
];

describe('PagingHelper', () => {
  desktopCases.forEach(([[active, total], expecting]) => {
    it(`Desktop. Active: ${active}; Total: ${total}`, () => {
      expect(getItems(active, total, false)).toEqual(expecting);
    });
  });

  mobileCases.forEach(([[active, total], expecting]) => {
    it(`Mobile. Active: ${active}; Total: ${total}`, () => {
      expect(getItems(active, total, true)).toEqual(expecting);
    });
  });
});
