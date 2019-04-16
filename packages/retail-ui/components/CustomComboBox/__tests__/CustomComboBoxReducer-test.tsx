import * as React from 'react';
import { Effect } from '../CustomComboBoxReducer';

interface ItemType {
  value: number;
  label: string;
}

type RenderValue = (item: ItemType) => React.ReactText;

const createGetPropsMock = (renderValue: RenderValue) =>
  jest.fn(() => ({
    onUnexpectedInput: null,
    renderValue,
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
    renderValue: (item: ItemType) => item.label,
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
    renderValue: (item: ItemType) => item.label,
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
    renderValue: (item: ItemType) => `${item.label} Plus`,
    expectedDispatch: true,
  },
];

describe('Default combobox reducer', () => {
  testCase.forEach(({ inputValue, items, renderValue, expectedDispatch }, index) => {
    it(`ValueChange after UnexpectedInput (test ${index + 1})`, () => {
      const mockedGetProps = createGetPropsMock(renderValue);
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
