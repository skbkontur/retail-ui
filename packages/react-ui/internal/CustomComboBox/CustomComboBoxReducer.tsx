import React from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import { isNonNullable } from '../../lib/utils';
import { isKeyArrowUp, isKeyArrowVertical, isKeyEnter, isKeyEscape } from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { Nullable } from '../../typings/utility-types';

import { CustomComboBox, CustomComboBoxProps, CustomComboBoxState, DefaultState } from './CustomComboBox';
import { ComboBoxRequestStatus } from './CustomComboBoxTypes';

export type CustomComboBoxAction<T> =
  | { type: 'ValueChange'; value: T; keepFocus: boolean }
  | { type: 'TextChange'; value: string }
  | { type: 'KeyPress'; event: React.KeyboardEvent }
  | {
      type: 'DidUpdate';
      prevProps: CustomComboBoxProps<T>;
      prevState: CustomComboBoxState<T>;
    }
  | { type: 'Mount' }
  | { type: 'Focus' }
  | { type: 'InputClick' }
  | { type: 'Blur' }
  | { type: 'Reset' }
  | { type: 'Open' }
  | { type: 'Close' }
  | { type: 'Search'; query: string }
  | { type: 'RequestItems' }
  | { type: 'ReceiveItems'; items: T[] }
  | { type: 'RequestFailure'; repeatRequest: () => void }
  | { type: 'CancelRequest' };

export type CustomComboBoxEffect<T> = (
  dispatch: (action: CustomComboBoxAction<T>) => void,
  getState: () => CustomComboBoxState<T>,
  getProps: () => CustomComboBoxProps<T>,
  getInstance: () => CustomComboBox<T>,
) => void;

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

  ValueChange: (value: any) => Effect;
  UnexpectedInput: (textValue: string, items: Nullable<any[]>) => Effect;
  InputChange: Effect;
  InputFocus: Effect;
  HighlightMenuItem: Effect;
  SelectMenuItem: (event: React.KeyboardEvent<HTMLElement>) => Effect;
  InputKeyDown: (event: React.KeyboardEvent<HTMLElement>) => Effect;
  MoveMenuHighlight: (direction: 'up' | 'down') => Effect;
  ResetHighlightedMenuItem: Effect;
  Reflow: Effect;
  SelectInputText: Effect;
}

const DEBOUNCE_DELAY = 300;

const getValueString = (value: any, valueToString: CustomComboBoxProps<any>['valueToString']) => {
  return isNonNullable(value) ? valueToString(value) : '';
};

export const Effect: EffectFactory = {
  Search: (query) => (dispatch, getState, getProps, getInstance) => {
    getInstance().search(query);
  },
  DebouncedSearch: debounce((dispatch, getState, getProps, getInstance) => {
    const searchEffect = Effect.Search(getState().textValue);
    searchEffect(dispatch, getState, getProps, getInstance);
  }, DEBOUNCE_DELAY),
  CancelRequest: (dispatch, getState, getProps, getInstance) => {
    Effect.DebouncedSearch.cancel();
    getInstance().cancelSearch();
  },
  Blur: (dispatch, getState, getProps) => {
    const { onBlur } = getProps();
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
  ValueChange: (value) => (dispatch, getState, getProps) => {
    const { onValueChange } = getProps();
    if (onValueChange) {
      onValueChange(value);
    }
  },
  UnexpectedInput: (textValue, items) => (dispatch, getState, getProps) => {
    const { onUnexpectedInput, valueToString } = getProps();

    if (Array.isArray(items) && items.length === 1) {
      const singleItem = items[0];
      const valueContent = getValueString(singleItem, valueToString);

      if (valueContent === textValue) {
        dispatch({ type: 'ValueChange', value: singleItem, keepFocus: false });
        return;
      }
    }

    if (onUnexpectedInput) {
      const value = onUnexpectedInput(textValue);
      if (value !== undefined) {
        dispatch({ type: 'ValueChange', value, keepFocus: false });
      }
    }
  },
  InputChange: (dispatch, getState, getProps) => {
    const { onInputValueChange } = getProps();
    const { textValue } = getState();
    if (onInputValueChange) {
      const returnedValue = onInputValueChange(textValue);
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
    if (items && items.length && isNonNullable(value)) {
      index = items.findIndex((x) => itemToValue(x) === itemToValue(value));
    }
    menu.highlightItem(index);

    if (index >= 0) {
      // FIXME: accessing private props
      // @ts-ignore
      requestAnimationFrame(() => menu && menu.scrollToSelected());
      return;
    }

    if (textValue !== valueString || requestStatus === ComboBoxRequestStatus.Failed) {
      requestAnimationFrame(() => menu && menu.down());
    }
  },
  SelectMenuItem: (event) => (dispatch, getState, getProps, getInstance) => {
    const { menu } = getInstance();
    if (menu) {
      menu.enter(event);
    }
  },
  MoveMenuHighlight: (direction) => (dispatch, getState, getProps, getInstance) => {
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
  InputKeyDown: (event) => (dispatch, getState, getProps, getInstance) => {
    const { onInputKeyDown } = getProps();
    if (onInputKeyDown) {
      onInputKeyDown(event);
    }
  },
};

const never = (_: never) => null;

export function reducer<T>(
  state: CustomComboBoxState<T>,
  props: CustomComboBoxProps<T>,
  action: CustomComboBoxAction<T>,
): Pick<CustomComboBoxState<T>, never> | [Pick<CustomComboBoxState<T>, never>, Array<CustomComboBoxEffect<T>>] {
  switch (action.type) {
    case 'ValueChange': {
      const { value, keepFocus } = action;
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
          [Effect.ValueChange(value), Effect.CancelRequest, Effect.InputFocus],
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
        [Effect.ValueChange(value), Effect.CancelRequest],
      ];
    }
    case 'TextChange': {
      const newState = {
        inputChanged: true,
        textValue: action.value,
      };
      if (!action.value && !props.searchOnFocus) {
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
    }
    case 'KeyPress': {
      const e = action.event as React.KeyboardEvent<HTMLElement>;
      const effects = [];
      let nextState = state;

      switch (true) {
        case isKeyEnter(e):
          e.preventDefault();
          effects.push(Effect.SelectMenuItem(e));
          break;
        case isKeyArrowVertical(e):
          e.preventDefault();
          effects.push(Effect.MoveMenuHighlight(isKeyArrowUp(e) ? 'up' : 'down'));
          if (!state.opened) {
            effects.push(Effect.Search(state.textValue));
          }
          break;
        case isKeyEscape(e):
          nextState = {
            ...state,
            items: null,
            opened: false,
          };
          break;
      }
      return [nextState, [...effects, Effect.InputKeyDown(e)]];
    }
    case 'DidUpdate': {
      if (isEqual(props.value, action.prevProps.value)) {
        return state;
      }

      return {
        opened: false,
        textValue: state.editing ? state.textValue : getValueString(props.value, props.valueToString),
      };
    }
    case 'Mount': {
      return {
        textValue: getValueString(props.value, props.valueToString),
      };
    }
    case 'Focus': {
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
    }
    case 'InputClick': {
      if (!state.opened && props.searchOnFocus) {
        return [state, [Effect.Search('')]];
      }
      return state;
    }
    case 'Blur': {
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
    }
    case 'Reset': {
      return DefaultState;
    }
    case 'Open': {
      return { opened: true };
    }
    case 'Close': {
      return { opened: false, items: null };
    }
    case 'Search': {
      return [state, [Effect.Search(action.query)]];
    }
    case 'RequestItems': {
      return {
        loading: true,
        opened: true,
        requestStatus: ComboBoxRequestStatus.Pending,
      };
    }
    case 'ReceiveItems': {
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
    }
    case 'RequestFailure': {
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
    }
    case 'CancelRequest': {
      return {
        loading: false,
        requestStatus: ComboBoxRequestStatus.Unknown,
      };
    }
    default: {
      never(action);
    }
  }
  return state;
}
