import { Effect } from '../CustomComboBoxReducer';
import { CustomComboBoxProps } from '../CustomComboBox';

interface ItemType {
  value: number;
  label: string;
}

const createGetPropsMock = (props: Partial<CustomComboBoxProps<ItemType>>) => {
  return jest.fn(() => ({
    itemToValue: (item: ItemType) => item.value,
    valueToString: (item: ItemType) => item.label,
    renderValue: (item: ItemType) => item.label,
    renderItem: (item: ItemType) => item.label,
    getItems: () => Promise.resolve([]),
    ...props,
  }));
};

const unexpectedInputCases = [
  {
    inputValue: 'One',
    items: [
      {
        value: 1,
        label: 'One',
      },
    ],
    valueToString: (item: ItemType) => item.label,
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
  },
];

describe('Default combobox reducer', () => {
  unexpectedInputCases.forEach(({ inputValue, items, valueToString }) => {
    it(`should call 'dispatch' after 'ValueChange' in 'Effect.unexpectedInput' with ${JSON.stringify(
      items[0],
    )}`, () => {
      const mockedGetProps = createGetPropsMock({ valueToString });
      const mockedDispatch = jest.fn();
      const mockedGetState = jest.fn();
      const mockedGetInstance = jest.fn();

      Effect.unexpectedInput(inputValue, items)(mockedDispatch, mockedGetState, mockedGetProps, mockedGetInstance);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'ValueChange',
        keepFocus: false,
        value: items[0],
      });
    });
  });

  it('should not call `dispatch` after `ValueChange` in `Effect.unexpectedInput`', () => {
    const { valueToString, inputValue, items } = {
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
    };

    const mockedGetProps = createGetPropsMock({ valueToString });
    const mockedDispatch = jest.fn();
    const mockedGetState = jest.fn();
    const mockedGetInstance = jest.fn();

    Effect.unexpectedInput(inputValue, items)(mockedDispatch, mockedGetState, mockedGetProps, mockedGetInstance);

    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it('UnexpectedInput with single item should call `ValueChange` action once', () => {
    const mockedGetProps = createGetPropsMock({ onUnexpectedInput: (x: any) => x, valueToString: (x: any) => x });
    const mockedDispatch = jest.fn();
    const mockedGetState = jest.fn();
    const mockedGetInstance = jest.fn();
    Effect.unexpectedInput('Hello', ['Hello'])(mockedDispatch, mockedGetState, mockedGetProps, mockedGetInstance);

    expect(mockedDispatch).toHaveBeenCalledTimes(1);
  });
});
