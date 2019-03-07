import {
  CustomComboBoxReducers,
  CustomComboBoxAction,
  CustomComboBoxState,
  CustomComboBoxProps,
} from '../CustomComboBox';

const never = (_: never) => null;

function createReducer<T>(reducers: CustomComboBoxReducers<T>) {
  return (state: CustomComboBoxState<T>, props: CustomComboBoxProps<T>, action: CustomComboBoxAction<T>) => {
    switch (action.type) {
      case 'TextClear': {
        return reducers[action.type](state, props, action);
      }
      case 'ValueChange': {
        return reducers[action.type](state, props, action);
      }
      case 'TextChange': {
        return reducers[action.type](state, props, action);
      }
      case 'KeyPress': {
        return reducers[action.type](state, props, action);
      }
      case 'DidUpdate': {
        return reducers[action.type](state, props, action);
      }
      case 'Mount': {
        return reducers[action.type](state, props, action);
      }
      case 'Focus': {
        return reducers[action.type](state, props, action);
      }
      case 'InputClick': {
        return reducers[action.type](state, props, action);
      }
      case 'Blur': {
        return reducers[action.type](state, props, action);
      }
      case 'Reset': {
        return reducers[action.type](state, props, action);
      }
      case 'Open': {
        return reducers[action.type](state, props, action);
      }
      case 'Close': {
        return reducers[action.type](state, props, action);
      }
      case 'Search': {
        return reducers[action.type](state, props, action);
      }
      case 'RequestItems': {
        return reducers[action.type](state, props, action);
      }
      case 'ReceiveItems': {
        return reducers[action.type](state, props, action);
      }
      case 'RequestFailure': {
        return reducers[action.type](state, props, action);
      }
      case 'FocusNextElement': {
        return reducers[action.type](state, props, action);
      }
      case 'CancelRequest': {
        return reducers[action.type](state, props, action);
      }
      default: {
        never(action);
      }
    }
    return state;
  };
}

export default createReducer;
