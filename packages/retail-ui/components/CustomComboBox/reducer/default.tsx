import * as React from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import Menu from '../../Menu/Menu';
import CustomComboBox, {
  CustomComboBoxProps,
  CustomComboBoxState,
  DefaultState
} from '../CustomComboBox';
import LayoutEvents from '../../../lib/LayoutEvents';
import { Nullable } from '../../../typings/utility-types';
import warning from 'warning';
import ComboBoxView from '../ComboBoxView';
import reactGetTextContent from '../../../lib/reactGetTextContent/reactGetTextContent';
import { ComboBoxRequestStatus } from '../types';
import ReactDOM from 'react-dom';
import {
  getFirstFocusableElement,
  getNextFocusableElement
} from '../../../lib/dom/getFocusableElements';

interface BaseAction {
  type: string;
}

interface Action extends BaseAction {
  [key: string]: any;
}

export type Props = CustomComboBoxProps<any> & {
  getItems: (query: string) => Promise<any[]>;
  onBlur?: () => {};
  onChange?: (x0: { target: { value: any } }, value: any) => {};
  onFocus?: () => {};
  onInputChange?: (textValue: string) => any;
  onUnexpectedInput?: (query: string) => Nullable<boolean>;
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

function taskWithDelay(task: () => void, delay: number) {
  let cancelationToken: (() => void) = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, delay);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

const DEBOUNCE_DELAY = 300;
export const DELAY_BEFORE_SHOW_LOADER = 300;
export const LOADER_SHOW_TIME = 1000;

const searchFactory = (query: string): EffectType => async (
  dispatch,
  getState,
  getProps,
  getInstance
) => {
  if (getState().requestStatus === ComboBoxRequestStatus.Pending) {
    return;
  }

  let request = null;
  const { getItems } = getProps();

  const expectingId = (getInstance().requestId += 1);

  let { loaderShowDelay } = getInstance();

  if (!loaderShowDelay) {
    loaderShowDelay = new Promise(resolve => {
      const cancelLoader = taskWithDelay(() => {
        dispatch({ type: 'RequestItems' });
        setTimeout(resolve, LOADER_SHOW_TIME);
      }, DELAY_BEFORE_SHOW_LOADER);

      getInstance().cancelLoaderDelay = () => {
        cancelLoader();
        resolve();
      };
    });
  }

  getInstance().loaderShowDelay = loaderShowDelay;

  try {
    request = getItems(query);

    await request;
  } catch (error) {
    // NOTE Ignore error here
  } finally {
    if (!getState().loading && expectingId === getInstance().requestId) {
      getInstance().cancelLoaderDelay();
    }
  }

  try {
    const [items] = await Promise.all([request || [], loaderShowDelay]);

    if (expectingId === getInstance().requestId) {
      dispatch({ type: 'ReceiveItems', items });
    }
  } catch (error) {
    if (expectingId === getInstance().requestId) {
      dispatch({
        type: 'RequestFailure',
        repeatRequest: () => {
          Effect.Search(query)(dispatch, getState, getProps, getInstance);
          Effect.InputFocus(dispatch, getState, getProps, getInstance);
        }
      });
    }
  } finally {
    if (expectingId === getInstance().requestId) {
      getInstance().loaderShowDelay = null;
    }
  }
};

const getValueString = (value: any, valueToString: Props['valueToString']) => {
  if (!value) {
    return '';
  }
  return valueToString(value);
};

const Effect = {
  Search: searchFactory,
  DebouncedSearch: debounce((dispatch, getState, getProps, getInstance) => {
    const searchEffect = searchFactory(getState().textValue);
    searchEffect(dispatch, getState, getProps, getInstance);
  }, DEBOUNCE_DELAY),
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
    const { value, itemToValue, valueToString } = getProps();
    const { items, focused, textValue, requestStatus } = getState();
    const { menu }: { menu: Nullable<Menu> } = getInstance();
    const valueString = getValueString(value, valueToString);

    if (!menu) {
      return;
    }

    if (!focused) {
      return;
    }

    let index = -1;
    if (items && items.length && value) {
      index = items.findIndex(x => itemToValue(x) === itemToValue(value));
    }
    menu.highlightItem(index);

    if (index >= 0) {
      // FIXME: accessing private props
      // @ts-ignore
      process.nextTick(() => menu && menu._scrollToSelected());
      return;
    }

    if (
      textValue !== valueString ||
      requestStatus === ComboBoxRequestStatus.Failed
    ) {
      process.nextTick(() => menu && menu.down());
    }
  }) as EffectType,
  SelectMenuItem: (event: React.SyntheticEvent<any>) =>
    ((dispatch, getState, getProps, getInstance) => {
      const instance = getInstance();
      const { menu }: { menu: Nullable<Menu> } = instance;
      const eventType = event.type;
      const eventIsProperToFocusNextElement =
        (eventType === 'keyup' ||
          eventType === 'keydown' ||
          eventType === 'keypress') &&
        (event as React.KeyboardEvent).key === 'Enter';

      if (menu) {
        menu.enter(event);
        if (!menu.hasHighlightedItem() && eventIsProperToFocusNextElement) {
          Effect.FocusNextElement(instance);
        }
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
  ResetHighlightedMenuItem: ((dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();

    if (combobox.menu && combobox.menu.hasHighlightedItem()) {
      combobox.menu.reset();
    }
  }) as EffectType,
  Reflow: (() => {
    LayoutEvents.emit();
  }) as EffectType,
  SelectInputText: ((dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();
    combobox.selectInputText();
  }) as EffectType,
  FocusNextElement: (instance: CustomComboBox) => {
    const node = ReactDOM.findDOMNode(instance);

    if (node instanceof Element) {
      const currentFocusable = getFirstFocusableElement(node);
      if (currentFocusable) {
        const nextFocusable = getNextFocusableElement(
          currentFocusable,
          currentFocusable.parentElement
        );
        if (nextFocusable) {
          nextFocusable.focus();
        }
      }
    }
  }
};

const reducers: { [type: string]: Reducer } = {
  Mount: (state, props) => ({
    ...DefaultState,
    inputChanged: false,
    textValue: getValueString(props.value, props.valueToString)
  }),
  DidUpdate(state, props, action) {
    if (isEqual(props.value, action.prevProps.value)) {
      return state;
    }

    return {
      opened: false,
      textValue: state.editing
        ? state.textValue
        : getValueString(props.value, props.valueToString)
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
    if (state.editing) {
      return [
        {
          focused: true
        },
        [Effect.Search(state.textValue), Effect.Focus]
      ];
    }
    return [
      {
        focused: true,
        editing: true
      },
      [Effect.Search(''), Effect.Focus, Effect.SelectInputText]
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
    const textValue = getValueString(value, props.valueToString);
    if (keepFocus) {
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
        editing: false,
        textValue
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
          effects.push(Effect.Search(state.textValue));
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
        [Effect.Search('')]
      ];
    }
    return state;
  },
  RequestItems(state, props, action) {
    return {
      loading: true,
      opened: true,
      requestStatus: ComboBoxRequestStatus.Pending
    };
  },
  ReceiveItems(state, props, action) {
    const shouldResetMenuHighlight = state.textValue === '';
    return [
      {
        loading: false,
        opened: true,
        items: action.items,
        requestStatus: ComboBoxRequestStatus.Success
      },
      [
        shouldResetMenuHighlight
          ? Effect.ResetHighlightedMenuItem
          : Effect.HighlightMenuItem,
        Effect.Reflow
      ]
    ];
  },
  RequestFailure(state, props, action) {
    return [
      {
        loading: false,
        opened: true,
        items: null,
        requestStatus: ComboBoxRequestStatus.Failed,
        repeatRequest: action.repeatRequest
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
      opened: false,
      items: null
    };
  },
  Search: (state, props, { query }) => {
    return [state, [Effect.Search(query)]];
  }
};

export { reducers, Effect, getValueString };
