import { Effect } from '../CustomComboBoxReducer';

interface ItemType {
  value: number;
  label: string;
}

const createGetPropsMock = (valueToString: (item: ItemType) => string) =>
  jest.fn(() => ({
    onUnexpectedInput: null,
    valueToString,
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
    valueToString: (item: ItemType) => item.label,
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
    valueToString: (item: ItemType) => item.label,
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
    valueToString: (item: ItemType) => `${item.label} Plus`,
    expectedDispatch: true,
  },
];

describe('Default combobox reducer', () => {
  testCase.forEach(({ inputValue, items, valueToString, expectedDispatch }, index) => {
    it(`ValueChange after UnexpectedInput (test ${index + 1})`, () => {
      const mockedGetProps = createGetPropsMock(valueToString);
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
