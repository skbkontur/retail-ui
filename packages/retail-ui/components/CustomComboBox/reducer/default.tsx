import * as React from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import MenuItem from '../../MenuItem';
import Menu from '../../Menu/Menu';
import { DefaultState } from '../CustomComboBox';
import CustomComboBox, {
  CustomComboBoxProps,
  CustomComboBoxState
} from '../CustomComboBox';
import LayoutEvents from '../../../lib/LayoutEvents';
import { Nullable } from '../../../typings/utility-types';
import warning from 'warning';
import ComboBoxView from '../ComboBoxView';
import reactGetTextContent from '../../../lib/reactGetTextContent/reactGetTextContent';

interface BaseAction {
  type: string;
}

interface Action extends BaseAction {
  [key: string]: any;
}

export type Props = CustomComboBoxProps<any> & {
  getItems: (query: string) => Promise<any[]>;
  itemToValue?: (x0: any) => string;
  onBlur?: () => {};
  onChange?: (x0: { target: { value: any } }, value: any) => {};
  onFocus?: () => {};
  onInputChange?: (textValue: string) => any;
  onUnexpectedInput?: (query: string) => Nullable<boolean>;
  valueToString?: (x0: any) => string;
};

export type State = {
  inputChanged?: boolean;
  focused?: boolean;
} & CustomComboBoxState<any>;

export type EffectType = (
  dispatch: (action: Action) => void,
  getState: () => State,
  getProps: () => Props,
  getInstance: () => CustomComboBox
) => void;

export type Reducer = (
  state: State,
  props: Props,
  action: Action
) => Partial<State> | [Partial<State>, EffectType[]];

let requestId = 0;
const searchFactory = (isEmpty: boolean): EffectType => (
  dispatch,
  getState,
  getProps
) => {
  async function makeRequest() {
    dispatch({ type: 'RequestItems' });
    const { getItems } = getProps();
    const searchValue = isEmpty ? '' : getState().textValue;
    const expectingId = ++requestId;

    try {
      const items = await getItems(searchValue);
      if (expectingId === requestId) {
        dispatch({ type: 'ReceiveItems', items });
      }
    } catch (e) {
      if (expectingId === requestId) {
        dispatch({ type: 'RequestFailure', repeatRequest: makeRequest });
      }
    }
  }
  makeRequest();
};
const getValueString = (value: any, valueToString: Props['valueToString']) => {
  if (!value) {
    return '';
  }
  return valueToString ? valueToString(value) : value;
};

const Effect = {
  Search: searchFactory,
  DebouncedSearch: debounce(searchFactory(false), 300),
  Blur: ((dispatch, getState, getProps) => {
    const { onBlur } = getProps();

    Effect.DebouncedSearch.cancel();

    if (onBlur) {
      onBlur();
    }
  }) as EffectType,
  Focus: ((dispatch, getState, getProps) => {
    const { onFocus } = getProps();
    if (onFocus) {
      onFocus();
    }
  }) as EffectType,
  Change: (value: any): EffectType => (dispatch, getState, getProps) => {
    const { onChange } = getProps();
    if (onChange) {
      onChange({ target: { value } }, value);
    }
  },
  UnexpectedInput: (textValue: string, items: any): EffectType => (
    dispatch,
    getState,
    getProps
  ) => {
    const {
      onUnexpectedInput,
      renderItem = ComboBoxView.defaultProps.renderItem
    } = getProps();

    if (Array.isArray(items) && items.length === 1) {
      const singleItem = items[0];
      const renderedValue: React.ReactNode = renderItem(singleItem);
      const valueContent = reactGetTextContent(renderedValue);

      if (valueContent === textValue) {
        dispatch({ type: 'ValueChange', value: singleItem });
      }
    }

    if (onUnexpectedInput) {
      // NOTE Обсудить поведение onUnexpectedInput
      const value = onUnexpectedInput(textValue);
      if (value === null) {
        warning(
          false,
          `[ComboBox] Returning 'null' is deprecated in 'onUnexpectedInput'. For clear value use instance method 'reset'`
        );
        dispatch({ type: 'TextClear', value: '' });
      } else if (value !== undefined) {
        dispatch({ type: 'ValueChange', value });
      }
    }
  },
  InputChange: ((dispatch, getState, getProps) => {
    const { onInputChange } = getProps();
    const { textValue } = getState();
    if (onInputChange) {
      const returnedValue = onInputChange(textValue);
      if (typeof returnedValue === 'string' && returnedValue !== textValue) {
        dispatch({ type: 'TextChange', value: returnedValue });
      }
    }
  }) as EffectType,
  InputFocus: ((dispatch, getState, getProps, getInstance) => {
    const { input } = getInstance();

    if (!input) {
      return;
    }

    input.focus();
  }) as EffectType,
  HighlightMenuItem: ((dispatch, getState, getProps, getInstance) => {
    const { value, itemToValue } = getProps();
    const { items, focused } = getState();
    const { menu }: { menu: Nullable<Menu> } = getInstance();

    if (!menu) {
      return;
    }

    if (!focused) {
      return;
    }

    let index = -1;
    if (items && items.length && value && itemToValue) {
      index = items.findIndex(x => itemToValue(x) === itemToValue(value));
    }
    // FIXME: accessing private props
    // @ts-ignore
    menu.highlightItem(index);
    if (index >= 0) {
      // FIXME: accessing private props
      // @ts-ignore
      process.nextTick(() => menu && menu._scrollToSelected());
    } else {
      process.nextTick(() => menu && menu.down());
    }
  }) as EffectType,
  SelectMenuItem: (event: React.SyntheticEvent<any>) =>
    ((dispatch, getState, getProps, getInstance) => {
      const { menu }: { menu: Nullable<Menu> } = getInstance();
      if (menu) {
        menu.enter(event);
      }
    }) as EffectType,
  MoveMenuHighlight: (direction: 1 | -1): EffectType => (
    dispatch,
    getState,
    getProps,
    getInstance
  ) => {
    const { menu }: { menu: Nullable<Menu> } = getInstance();
    if (menu) {
      // FIXME: accessing private props
      // @ts-ignore
      menu._move(direction);
    }
  },
  Reflow: (() => {
    LayoutEvents.emit();
  }) as EffectType,
  SelectInputText: ((dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();
    combobox.selectInputText();
  }) as EffectType
};

const reducers: { [type: string]: Reducer } = {
  Mount: () => ({ ...DefaultState, inputChanged: false }),
  DidUpdate(state, props, action) {
    if (isEqual(props.value, action.prevProps.value)) {
      return state;
    }

    return {
      opened: false
    } as State;
  },
  Blur(state, props, action) {
    const { inputChanged, items } = state;
    if (!inputChanged) {
      return [
        {
          focused: false,
          opened: false,
          items: null,
          editing: false
        },
        [Effect.Blur]
      ];
    }

    return [
      {
        opened: false,
        items: null
      },
      [Effect.Blur, Effect.UnexpectedInput(state.textValue, items)]
    ];
  },
  Focus(state, props, action) {
    const { value, valueToString } = props;
    const textValue = getValueString(value, valueToString);

    if (state.editing) {
      return [
        {
          focused: true,
          opened: true
        },
        [Effect.Search(false), Effect.Focus]
      ];
    }

    return [
      {
        focused: true,
        opened: true,
        editing: true,
        textValue
      },
      [Effect.Search(true), Effect.Focus, Effect.SelectInputText]
    ];
  },
  TextChange(state, props, action) {
    return [
      {
        inputChanged: true,
        textValue: action.value
      },
      [Effect.DebouncedSearch, Effect.InputChange]
    ];
  },
  TextClear(state, props, action) {
    return {
      textValue: action.value
    };
  },
  ValueChange(state, props, { value, keepFocus }) {
    if (keepFocus) {
      const textValue = getValueString(value, props.valueToString);
      return [
        {
          opened: false,
          inputChanged: false,
          editing: true,
          items: null,
          textValue
        },
        [Effect.Change(value), Effect.InputFocus]
      ];
    }
    return [
      {
        opened: false,
        inputChanged: false,
        editing: false
      },
      [Effect.Change(value)]
    ];
  },
  KeyPress(state, props, { event }) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        return [state, [Effect.SelectMenuItem(event)]];
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        const effects = [
          Effect.MoveMenuHighlight(event.key === 'ArrowUp' ? -1 : 1)
        ];
        if (!state.opened) {
          effects.push(Effect.Search(false));
        }
        return [
          {
            opened: true
          },
          effects
        ];
      case 'Escape':
        return {
          items: null,
          opened: false
        };
      default:
        return state;
    }
  },
  InputClick(state, props, action) {
    if (!state.opened) {
      return [
        {
          opened: true
        },
        [Effect.Search(false)]
      ];
    }
    return state;
  },
  RequestItems(state, props, action) {
    return {
      loading: true,
      opened: true
    };
  },
  ReceiveItems(state, props, action) {
    return [
      {
        loading: false,
        items: action.items
      },
      [Effect.HighlightMenuItem, Effect.Reflow]
    ];
  },
  RequestFailure(state, props, action) {
    return [
      {
        loading: false,
        items: [
          <MenuItem disabled key="message">
            <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
              Что-то пошло не так. Проверьте соединение с интернетом и
              попробуйте еще раз
            </div>
          </MenuItem>,
          <MenuItem alkoLink onClick={action.repeatRequest} key="retry">
            Обновить
          </MenuItem>
        ]
      },
      [Effect.HighlightMenuItem]
    ];
  },
  Reset() {
    return DefaultState;
  },
  Open: () => {
    return {
      opened: true
    };
  },
  Close: () => {
    return {
      opened: false
    };
  }
};

export { reducers, Effect };
