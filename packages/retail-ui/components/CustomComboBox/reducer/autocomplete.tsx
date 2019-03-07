import { reducers as defaultReducers, Effect, getValueString } from './default';
import { CustomComboBoxReducers } from '../CustomComboBox';

const reducers: CustomComboBoxReducers<any> = {
  ...defaultReducers,
  Focus: (state, { value, valueToString }, action) => {
    const textValue = state.editing ? state.textValue : getValueString(value, valueToString);
    return [
      {
        textValue,
        focused: true,
        editing: true,
        opened: false,
        items: null,
      },
      [Effect.Focus],
    ];
  },
  InputClick(state, props, action) {
    return state;
  },
  TextChange: (state, props, action: { type: 'TextChange'; value: string }) => {
    if (!action.value) {
      return [
        {
          ...state,
          textValue: '',
          inputChanged: true,
          opened: false,
          items: null,
        },
        [Effect.InputChange],
      ];
    }
    return [
      {
        ...state,
        inputChanged: true,
        textValue: action.value,
      },
      [Effect.DebouncedSearch, Effect.InputChange],
    ];
  },
};

export { reducers };
