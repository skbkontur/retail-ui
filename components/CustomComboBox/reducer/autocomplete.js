// @flow
import {
  reducers as defaultReducers,
  defaultState,
  Effect as DefaultEffect
} from './default';

import debounce from 'lodash.debounce';

const Effect = {};

Effect.Search = (dispatch, getState, getProps, getInstance) => {
  DefaultEffect.Search(false)(dispatch, getState, getProps, getInstance);
  dispatch({ type: 'Open' });
};

Effect.DebouncedSearch = debounce(Effect.Search, 300);

const reducers = {
  ...defaultReducers,
  Focus: (state, props, action) => {
    const textValue = props.value ? props.valueToString(props.value) : '';
    if (!textValue) {
      return [
        {
          ...state,
          editing: true,
          opened: false,
          items: null
        },
        [DefaultEffect.Focus]
      ];
    }

    return [
      {
        ...state,
        editing: true,
        opened: true,
        items: null
      },
      [Effect.Search, DefaultEffect.Focus]
    ];
  },
  TextChange: (state, props, action) => {
    if (!action.value) {
      return [
        {
          ...state,
          textValue: '',
          opened: false,
          items: null
        },
        [DefaultEffect.InputChange]
      ];
    }
    return [
      {
        ...state,
        textValue: action.value
      },
      [
        Effect.DebouncedSearch,
        DefaultEffect.InputChange
      ]
    ];
  },
  Open: (state, props, action) => {
    return {
      ...state,
      opened: true
    };
  }
};

export { reducers, defaultState };
