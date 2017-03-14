// @flow
/* global $Subtype */

import MenuItem from '../../MenuItem';

type Action = $Subtype<{ type: string }>;

type Props = {
  onBlur?: () => {},
  onChange?: () => {},
  onFocus?: () => {},
  onSearchRequest?: (query: string) => Promise<any[]>,
  onUnexpectedInput?: (query: string) => ?boolean,
  value?: any,
  valueToString: (any) => string
};

type State = {
  editing: boolean,
  inputChanged: boolean,
  items: ?Array<any>,
  loading: boolean,
  opened: boolean,
  textValue: string
};

const defaultState = {
  editing: false,
  inputChanged: false,
  items: null,
  loading: false,
  opened: false,
  textValue: ''
};

const Effect = {
  SearchRequest: (isEmpty: boolean) =>
    (dispatch, getState, getProps, getInstance) => {
      function makeRequest() {
        dispatch({ type: 'RequestItems' });
        const { onSearchRequest } = getProps();
        onSearchRequest(isEmpty ? '' : getState().textValue).then(
          items => dispatch({ type: 'ReceiveItems', items }),
          () => dispatch({ type: 'RequestFailure', repeatRequest: makeRequest })
        );
      }

      makeRequest();
    },
  Focus: (_, __, getProps, getInstance) => {
    const { onFocus } = getProps();
    onFocus && onFocus();
    const { focus } = getInstance();
    focus();
  },
  Change: value =>
    (_, __, getProps) => {
      const { onChange } = getProps();
      onChange && onChange(value);
    }
};

function blur(state, props, action) {
  const { items } = state;
  props.onBlur && props.onBlur();

  if (items && items.length === 1) {
    props.onChange && props.onChange(items[0]);
    return {
      ...state,
      editing: false,
      opened: false
    };
  }
  props.onUnexpectedInput && props.onUnexpectedInput(state.textValue);
  return {
    ...state,
    opened: false
  };
}

function focus(state, props, action) {
  if (state.editing) {
    return [
      {
        ...state,
        opened: true
      },
      [Effect.SearchRequest(false), Effect.Focus]
    ];
  }

  return [
    {
      ...state,
      opened: true,
      editing: true,
      textValue: props.value ? props.valueToString(props.value) : ''
    },
    [Effect.SearchRequest(true), Effect.Focus]
  ];
}

function textChange(state, props, action) {
  return {
    ...state,
    textValue: action.value
  };
}

function valueChange(state, props, action) {
  return [
    {
      ...state,
      opened: false,
      editing: false
    },
    [Effect.Change(action.value)]
  ];
}

function keyPress(state, props, action) {
  return state;
}

function requestItems(state, props, action) {
  return {
    ...state,
    loading: true
  };
}

function receiveItems(state, props, action) {
  return {
    ...state,
    loading: false,
    items: action.items
  };
}

function requestFailure(state, props, action) {
  return {
    ...state,
    items: [
      <MenuItem disabled>
        <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
          Что-то пошло не так. Проверьте соединение{' '}
          с интернетом и попробуйте еще раз
        </div>
      </MenuItem>,
      <MenuItem alkoLink onClick={action.repeatRequest}>
        Обновить
      </MenuItem>
    ]
  };
}

type Reducer = (state: State, props: Props, action: Action) =>
  | State
  | [State, Function[]];

const reducers: { [type: string]: Reducer } = {
  Mount: () => defaultState,
  Blur: blur,
  Focus: focus,
  TextChange: textChange,
  ValueChange: valueChange,
  KeyPress: keyPress,
  RequestItems: requestItems,
  ReceiveItems: receiveItems,
  RequestFailure: requestFailure
};

export default reducers;
export { defaultState };
