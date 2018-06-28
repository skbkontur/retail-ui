import {
  reducers as defaultReducers,
  Effect as DefaultEffect,
  EffectType,
  Reducer
} from './default';

import debounce from 'lodash.debounce';

const Effect = {
  ...DefaultEffect,
  Search: ((dispatch, getState, getProps, getInstance) => {
    DefaultEffect.Search(false)(dispatch, getState, getProps, getInstance);
    dispatch({ type: 'Open' });
  }) as EffectType
};

Effect.DebouncedSearch = debounce(Effect.Search, 300);

const reducers: { [key: string]: Reducer } = {
  ...defaultReducers,
  Focus: (state, props, action) => {
    const textValue = props.value ? props.valueToString!(props.value) : '';
    if (!textValue) {
      return [
        {
          ...state,
          focused: true,
          editing: true,
          opened: false,
          items: null
        },
        [Effect.Focus]
      ];
    }

    return [
      {
        ...state,
        textValue,
        focused: true,
        editing: true,
        opened: true,
        items: null
      },
      [Effect.Search, Effect.Focus]
    ];
  },
  TextChange: ((
    state,
    props,
    action: { type: 'TextChange'; value: string }
  ) => {
    if (!action.value) {
      return [
        {
          ...state,
          textValue: '',
          inputChanged: true,
          opened: false,
          items: null
        },
        [Effect.InputChange]
      ];
    }
    return [
      {
        ...state,
        inputChanged: true,
        textValue: action.value
      },
      [Effect.DebouncedSearch, Effect.InputChange]
    ];
  }) as Reducer,
  Open: (state, props, action) => {
    return {
      ...state,
      opened: true
    };
  }
};

export { reducers };
