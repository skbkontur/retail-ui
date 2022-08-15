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
  search: (query: string) => Effect;
  debouncedSearch: Effect & {
    cancel(): void;
    flush(): void;
  };
  cancelRequest: Effect;
  blur: Effect;
  focus: Effect;

  valueChange: (value: any) => Effect;
  unexpectedInput: (textValue: string, items: Nullable<any[]>) => Effect;
  inputChange: Effect;
  inputFocus: Effect;
  highlightMenuItem: Effect;
  selectMenuItem: (event: React.KeyboardEvent<HTMLElement>) => Effect;
  inputKeyDown: (event: React.KeyboardEvent<HTMLElement>) => Effect;
  moveMenuHighlight: (direction: 'up' | 'down') => Effect;
  resetHighlightedMenuItem: Effect;
  reflow: Effect;
  selectInputText: Effect;
}

const DEBOUNCE_DELAY = 300;

const getValueString = (value: any, valueToString: CustomComboBoxProps<any>['valueToString']) => {
  return isNonNullable(value) ? valueToString(value) : '';
};

export const Effect: EffectFactory = {
  search: (query) => (dispatch, getState, getProps, getInstance) => {
    getInstance().search(query);
  },
  debouncedSearch: debounce((dispatch, getState, getProps, getInstance) => {
    const searchEffect = Effect.search(getState().textValue);
    searchEffect(dispatch, getState, getProps, getInstance);
  }, DEBOUNCE_DELAY),
  cancelRequest: (dispatch, getState, getProps, getInstance) => {
    Effect.debouncedSearch.cancel();
    getInstance().cancelSearch();
  },
  blur: (dispatch, getState, getProps) => {
    const { onBlur } = getProps();
    if (onBlur) {
      onBlur();
    }
  },
  focus: (dispatch, getState, getProps) => {
    const { onFocus } = getProps();
    if (onFocus) {
      onFocus();
    }
  },
  valueChange: (value) => (dispatch, getState, getProps) => {
    const { onValueChange } = getProps();
    if (onValueChange) {
      onValueChange(value);
    }
  },
  unexpectedInput: (textValue, items) => (dispatch, getState, getProps) => {
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
  inputChange: (dispatch, getState, getProps) => {
    const { onInputValueChange } = getProps();
    const { textValue } = getState();
    if (onInputValueChange) {
      const returnedValue = onInputValueChange(textValue);
      if (typeof returnedValue === 'string' && returnedValue !== textValue) {
        dispatch({ type: 'TextChange', value: returnedValue });
      }
    }
  },
  inputFocus: (dispatch, getState, getProps, getInstance) => {
    const { input } = getInstance();

    if (!input) {
      return;
    }

    input.focus();
  },
  highlightMenuItem: (dispatch, getState, getProps, getInstance) => {
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
      // @ts-expect-error: Use of private property.
      requestAnimationFrame(() => menu && menu.scrollToSelected());
      return;
    }

    if (textValue !== valueString || requestStatus === ComboBoxRequestStatus.Failed) {
      requestAnimationFrame(() => menu && menu.down());
    }
  },
  selectMenuItem: (event) => (dispatch, getState, getProps, getInstance) => {
    const { menu } = getInstance();
    if (menu) {
      menu.enter(event);
    }
  },
  moveMenuHighlight: (direction) => (dispatch, getState, getProps, getInstance) => {
    const { menu } = getInstance();
    if (menu) {
      menu[direction]();
    }
  },
  resetHighlightedMenuItem: (dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();

    if (combobox.menu && combobox.menu.hasHighlightedItem()) {
      combobox.menu.reset();
    }
  },
  reflow: () => {
    LayoutEvents.emit();
  },
  selectInputText: (dispatch, getState, getProps, getInstance) => {
    const combobox = getInstance();
    combobox.selectInputText();
  },
  inputKeyDown: (event) => (dispatch, getState, getProps) => {
    const { onInputKeyDown } = getProps();
    if (onInputKeyDown) {
      onInputKeyDown(event);
    }
  },
};

const never = () => null;

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
          [Effect.valueChange(value), Effect.cancelRequest, Effect.inputFocus],
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
        [Effect.valueChange(value), Effect.cancelRequest],
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
          [Effect.inputChange],
        ];
      }
      return [newState, [Effect.debouncedSearch, Effect.inputChange]];
    }
    case 'KeyPress': {
      const e = action.event as React.KeyboardEvent<HTMLElement>;
      const effects = [];
      let nextState = state;

      switch (true) {
        case isKeyEnter(e):
          e.preventDefault();
          effects.push(Effect.selectMenuItem(e));
          break;
        case isKeyArrowVertical(e):
          e.preventDefault();
          effects.push(Effect.moveMenuHighlight(isKeyArrowUp(e) ? 'up' : 'down'));
          if (!state.opened) {
            effects.push(Effect.search(state.textValue));
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
      return [nextState, [...effects, Effect.inputKeyDown(e)]];
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
        return [newState, [Effect.focus]];
      }
      if (state.editing) {
        return [newState, [Effect.search(state.textValue), Effect.focus]];
      }
      return [newState, [Effect.search(''), Effect.focus, Effect.selectInputText]];
    }
    case 'InputClick': {
      if (!state.opened && props.searchOnFocus) {
        return [state, [Effect.search('')]];
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
          [Effect.blur, Effect.cancelRequest],
        ];
      }

      return [
        {
          focused: false,
          opened: false,
          items: null,
        },
        [Effect.blur, Effect.cancelRequest, Effect.unexpectedInput(state.textValue, items)],
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
      return [state, [Effect.search(action.query)]];
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
        [shouldResetMenuHighlight ? Effect.resetHighlightedMenuItem : Effect.highlightMenuItem, Effect.reflow],
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
        [Effect.highlightMenuItem],
      ];
    }
    case 'CancelRequest': {
      return {
        loading: false,
        requestStatus: ComboBoxRequestStatus.Unknown,
      };
    }
    default: {
      never();
    }
  }
  return state;
}
