import * as React from 'react';
import ReactDOM from 'react-dom';
import warning from 'warning';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { CustomComboBoxProps, DefaultState, CustomComboBoxEffect, CustomComboBoxReducers } from '../CustomComboBox';
import LayoutEvents from '../../../lib/LayoutEvents';
import { Nullable } from '../../../typings/utility-types';
import ComboBoxView from '../ComboBoxView';
import reactGetTextContent from '../../../lib/reactGetTextContent/reactGetTextContent';
import { ComboBoxRequestStatus } from '../CustomComboBoxTypes';
import { getFirstFocusableElement, getNextFocusableElement } from '../../../lib/dom/getFocusableElements';

type Effect = CustomComboBoxEffect<any>;

interface EffectFactory {
  Search: (query: string) => Effect;
  DebouncedSearch: Effect & {
    cancel(): void;
    flush(): void;
  };
  CancelRequest: Effect;
  Blur: Effect;
  Focus: Effect;

  Change: (value: any) => Effect;
  UnexpectedInput: (textValue: string, items: Nullable<any[]>) => Effect;
  InputChange: Effect;
  InputFocus: Effect;
  HighlightMenuItem: Effect;
  SelectMenuItem: (event: React.KeyboardEvent<HTMLElement>) => Effect;
  MoveMenuHighlight: (direction: 'up' | 'down') => Effect;
  ResetHighlightedMenuItem: Effect;
  Reflow: Effect;
  SelectInputText: Effect;
  FocusNextElement: Effect;
}

const DEBOUNCE_DELAY = 300;

const getValueString = (value: any, valueToString: CustomComboBoxProps<any>['valueToString']) => {
  return value ? valueToString(value) : '';
};

const Effect: EffectFactory = {
  Search: query => (dispatch, getState, getProps, getInstance) => {
    getInstance().search(query);
  },
  DebouncedSearch: debounce((dispatch, getState, getProps, getInstance) => {
    const searchEffect = Effect.Search(getState().textValue);
    searchEffect(dispatch, getState, getProps, getInstance);
  }, DEBOUNCE_DELAY),
  CancelRequest: (dispatch, getState, getProps, getInstance) => {
    getInstance().cancelSearch();
  },
  Blur: (dispatch, getState, getProps) => {
    const { onBlur } = getProps();

    Effect.DebouncedSearch.cancel();

    if (onBlur) {
      onBlur();
    }
  },
  Focus: (dispatch, getState, getProps) => {
    const { onFocus } = getProps();
    if (onFocus) {
      onFocus();
    }
  },
  Change: value => (dispatch, getState, getProps) => {
    const { onChange } = getProps();
    if (onChange) {
      onChange({ target: { value } }, value);
    }
  },
  UnexpectedInput: (textValue, items) => (dispatch, getState, getProps) => {
    const { onUnexpectedInput, renderItem = ComboBoxView.defaultProps.renderItem } = getProps();

    if (Array.isArray(items) && items.length === 1) {
      const singleItem = items[0];
      const renderedValue: React.ReactNode = renderItem(singleItem);
      const valueContent = reactGetTextContent(renderedValue);

      if (valueContent === textValue) {
        dispatch({ type: 'ValueChange', value: singleItem, keepFocus: false });
      }
    }

    if (onUnexpectedInput) {
      // NOTE Обсудить поведение onUnexpectedInput
      const value = onUnexpectedInput(textValue);
      if (value === null) {
        warning(
          false,
          `[ComboBox] Returning 'null' is deprecated in 'onUnexpectedInput'. For clear value use instance method 'reset'`,
        );
        dispatch({ type: 'TextClear' });
      } else if (value !== undefined) {
        dispatch({ type: 'ValueChange', value, keepFocus: false });
      }
    }
  },
  InputChange: (dispatch, getState, getProps) => {
    const { onInputChange } = getProps();
    const { textValue } = getState();
    if (onInputChange) {
      const returnedValue = onInputChange(textValue);
      if (typeof returnedValue === 'string' && returnedValue !== textValue) {
        dispatch({ type: 'TextChange', value: returnedValue });
      }
    }
  },
  InputFocus: (dispatch, getState, getProps, getInstance) => {
    const { input } = getInstance();

    if (!input) {
      return;
    }

    input.focus();
  },
  HighlightMenuItem: (dispatch, getState, getProps, getInstance) => {
    const { value, itemToValue, valueToString } = getProps();
    const { items, focused, textValue, requestStatus } = getState();
    const { menu } = getInstance();
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

    if (textValue !== valueString || requestStatus === ComboBoxRequestStatus.Failed) {
      process.nextTick(() => menu && menu.down());
    }
  },
  SelectMenuItem: event => (dispatch, getState, getProps, getInstance) => {
    const instance = getInstance();
    const { requestStatus } = getState();
    const { menu } = instance;
    const eventType = event.type;
    const eventIsProperToFocusNextElement =
      (eventType === 'keyup' || eventType === 'keydown' || eventType === 'keypress') && event.key === 'Enter';

    if (menu) {
      menu.enter(event);
      if (eventIsProperToFocusNextElement && requestStatus !== ComboBoxRequestStatus.Failed) {
        dispatch({ type: 'FocusNextElement' });
      }
    }
  },
  MoveMenuHighlight: direction => (dispatch, getState, getProps, getInstance) => {
    const { menu } = getInstance();
    if (menu) {
      menu[direction]();
    }
  },
  ResetHighlightedMenuItem: (dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();

    if (combobox.menu && combobox.menu.hasHighlightedItem()) {
      combobox.menu.reset();
    }
  },
  Reflow: () => {
    LayoutEvents.emit();
  },
  SelectInputText: (dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();
    combobox.selectInputText();
  },
  FocusNextElement: (dispatch, getState, getProps, getInstance) => {
    const node = ReactDOM.findDOMNode(getInstance());

    if (node instanceof Element) {
      const currentFocusable = getFirstFocusableElement(node);
      if (currentFocusable) {
        const nextFocusable = getNextFocusableElement(currentFocusable, currentFocusable.parentElement);
        if (nextFocusable) {
          nextFocusable.focus();
        }
      }
    }
  },
};

const reducers: CustomComboBoxReducers<any> = {
  Mount: (state, props) => ({
    ...DefaultState,
    inputChanged: false,
    textValue: getValueString(props.value, props.valueToString),
  }),
  DidUpdate(state, props, action) {
    if (isEqual(props.value, action.prevProps.value)) {
      return state;
    }

    return {
      opened: false,
      textValue: state.editing ? state.textValue : getValueString(props.value, props.valueToString),
    };
  },
  Blur(state, props, action) {
    const { inputChanged, items } = state;
    if (!inputChanged) {
      return [
        {
          focused: false,
          opened: false,
          items: null,
          editing: false,
        },
        [Effect.Blur, Effect.CancelRequest],
      ];
    }

    return [
      {
        focused: false,
        opened: false,
        items: null,
      },
      [Effect.Blur, Effect.CancelRequest, Effect.UnexpectedInput(state.textValue, items)],
    ];
  },
  Focus(state, props, action) {
    const newState = {
      focused: true,
      editing: true,
    };
    if (!props.searchOnFocus) {
      return [newState, [Effect.Focus]];
    }
    if (state.editing) {
      return [newState, [Effect.Search(state.textValue), Effect.Focus]];
    }
    return [newState, [Effect.Search(''), Effect.Focus, Effect.SelectInputText]];
  },
  TextChange(state, props, action) {
    const newState = {
      inputChanged: true,
      textValue: action.value,
    };
    if (!action.value && props.searchOnFocus) {
      return [
        {
          ...newState,
          opened: false,
          items: null,
        },
        [Effect.InputChange],
      ];
    }
    return [newState, [Effect.DebouncedSearch, Effect.InputChange]];
  },
  TextClear(state, props, action) {
    return {
      textValue: '',
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
          textValue,
        },
        [Effect.Change(value), Effect.CancelRequest, Effect.InputFocus],
      ];
    }
    return [
      {
        opened: false,
        inputChanged: false,
        editing: false,
        items: null,
        textValue,
      },
      [Effect.Change(value), Effect.CancelRequest],
    ];
  },
  KeyPress(state, props, { event }) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        return [state, [Effect.SelectMenuItem(event as React.KeyboardEvent<HTMLElement>)]];
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        const effects = [Effect.MoveMenuHighlight(event.key === 'ArrowUp' ? 'up' : 'down')];
        if (!state.opened) {
          effects.push(Effect.Search(state.textValue));
        }
        return [state, effects];
      case 'Escape':
        return {
          items: null,
          opened: false,
        };
      default:
        return state;
    }
  },
  InputClick(state, props, action) {
    if (!state.opened && props.searchOnFocus) {
      return [state, [Effect.Search('')]];
    }
    return state;
  },
  RequestItems(state, props, action) {
    return {
      loading: true,
      opened: true,
      requestStatus: ComboBoxRequestStatus.Pending,
    };
  },
  ReceiveItems(state, props, action) {
    const shouldResetMenuHighlight = state.textValue === '';
    return [
      {
        loading: false,
        opened: true,
        items: action.items,
        requestStatus: ComboBoxRequestStatus.Success,
      },
      [shouldResetMenuHighlight ? Effect.ResetHighlightedMenuItem : Effect.HighlightMenuItem, Effect.Reflow],
    ];
  },
  RequestFailure(state, props, action) {
    return [
      {
        loading: false,
        opened: true,
        items: null,
        requestStatus: ComboBoxRequestStatus.Failed,
        repeatRequest: action.repeatRequest,
      },
      [Effect.HighlightMenuItem],
    ];
  },
  CancelRequest: () => {
    return {
      loading: false,
      requestStatus: ComboBoxRequestStatus.Unknown,
    };
  },
  Reset() {
    return DefaultState;
  },
  Open: () => {
    return {
      opened: true,
    };
  },
  Close: () => {
    return {
      opened: false,
      items: null,
    };
  },
  Search: (state, props, { query }) => {
    return [state, [Effect.Search(query)]];
  },
  FocusNextElement: (state, props, action) => {
    return [state, [Effect.FocusNextElement]];
  },
};

export { reducers, Effect, getValueString };
