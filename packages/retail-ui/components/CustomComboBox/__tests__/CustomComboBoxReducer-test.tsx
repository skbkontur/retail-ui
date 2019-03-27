import * as React from 'react';
import { Effect } from '../CustomComboBoxReducer';

interface ItemType {
  value: number;
  label: string;
}

type RenderItem = (item: ItemType) => React.ReactNode;

const createGetPropsMock = (renderItem: RenderItem) =>
  jest.fn(() => ({
    onUnexpectedInput: null,
    renderItem,
  }));

const testCase = [
  {
    inputValue: 'One',
    items: [
      {
        value: 1,
        label: 'One',
      },
    ],
    renderItem: (item: ItemType) => item.label,
    expectedDispatch: true,
  },
  {
    inputValue: 'One',
    items: [
      {
        value: 1,
        label: 'One',
      },
      {
        value: 2,
        label: 'Two',
      },
    ],
    renderItem: (item: ItemType) => item.label,
    expectedDispatch: false,
  },
  {
    inputValue: 'One Plus',
    items: [
      {
        value: 1,
        label: 'One',
      },
    ],
    renderItem: (item: ItemType) => `${item.label} Plus`,
    expectedDispatch: true,
  },
  {
    inputValue: 'Two',
    items: [
      {
        value: 2,
        label: 'Two',
      },
    ],
    renderItem: (item: ItemType) => <span>{item.label}</span>,
    expectedDispatch: true,
  },
];

describe('Default combobox reducer', () => {
  testCase.forEach(({ inputValue, items, renderItem, expectedDispatch }, index) => {
    it(`ValueChange after UnexpectedInput (test ${index + 1})`, () => {
      const mockedGetProps = createGetPropsMock(renderItem);
      const mockedDispatch = jest.fn();
      const mockedGetState = jest.fn();
      const mockedGetInstance = jest.fn();

      Effect.UnexpectedInput(inputValue, items)(mockedDispatch, mockedGetState, mockedGetProps, mockedGetInstance);

      if (expectedDispatch) {
        expect(mockedDispatch).toBeCalledWith({
          type: 'ValueChange',
          keepFocus: false,
          value: items[0],
        });
      } else {
        expect(mockedDispatch).not.toBeCalled();
      }
    });
  });
});
