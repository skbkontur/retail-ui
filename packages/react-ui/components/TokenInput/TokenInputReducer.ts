import { TokenInputState, DefaultState } from './TokenInput';

export interface TokenInputAction {
  type: TokenInputActionType;
  payload?: any;
}

export const TokenActions = {
  SET_INPUT_VALUE_WIDTH: 'SET_INPUT_VALUE_WIDTH',
  SET_INPUT_VALUE_HEIGHT: 'SET_INPUT_VALUE_HEIGHT',
  UPDATE_QUERY: 'UPDATE_QUERY',
  SET_FOCUS_IN: 'SET_FOCUS_IN',
  SET_PREVENT_BLUR: 'SET_PREVENT_BLUR',
  BLUR: 'BLUR',
  SET_AUTOCOMPLETE_ITEMS: 'SET_AUTOCOMPLETE_ITEMS',
  SET_ACTIVE_TOKENS: 'SET_ACTIVE_TOKENS',
  REMOVE_ALL_ACTIVE_TOKENS: 'REMOVE_ALL_ACTIVE_TOKENS',
  SET_LOADING: 'SET_LOADING',
  CLEAR_INPUT: 'CLEAR_INPUT',
  RESET: 'RESET',
  SET_EDITING_TOKEN_INDEX: 'SET_EDITING_TOKEN_INDEX',
  REMOVE_EDITING_TOKEN_INDEX: 'REMOVE_EDITING_TOKEN_INDEX',
  SET_TEMPORARY_QUERY: 'SET_TEMPORARY_QUERY',
  REMOVE_TEMPORARY_QUERY: 'REMOVE_TEMPORARY_QUERY',
};

export type TokenInputActionType = keyof typeof TokenActions;

export function tokenInputReducer<T = string>(
  state: TokenInputState<T>,
  action: TokenInputAction,
): Pick<TokenInputState<T>, never> {
  const payload = action.payload;
  switch (action.type) {
    case TokenActions.SET_INPUT_VALUE_WIDTH: {
      return { inputValueWidth: payload };
    }
    case TokenActions.SET_INPUT_VALUE_HEIGHT: {
      return { inputValueHeight: payload };
    }
    case TokenActions.UPDATE_QUERY: {
      return { inputValue: payload };
    }
    case TokenActions.SET_FOCUS_IN: {
      return { inFocus: true };
    }
    case TokenActions.SET_PREVENT_BLUR: {
      return { preventBlur: payload };
    }
    case TokenActions.SET_AUTOCOMPLETE_ITEMS: {
      return { autocompleteItems: payload };
    }
    case TokenActions.SET_ACTIVE_TOKENS: {
      return { activeTokens: payload };
    }
    case TokenActions.BLUR: {
      return {
        inFocus: false,
        preventBlur: false,
        autocompleteItems: undefined,
        activeTokens: [],
      };
    }
    case TokenActions.REMOVE_ALL_ACTIVE_TOKENS: {
      return { activeTokens: [] };
    }
    case TokenActions.CLEAR_INPUT: {
      return { inputValue: '', autocompleteItems: undefined };
    }
    case TokenActions.SET_LOADING: {
      return {
        loading: payload,
      };
    }
    case TokenActions.RESET: {
      return DefaultState;
    }
    case TokenActions.SET_EDITING_TOKEN_INDEX: {
      return { editingTokenIndex: payload };
    }
    case TokenActions.REMOVE_EDITING_TOKEN_INDEX: {
      return { editingTokenIndex: -1 };
    }
    case TokenActions.SET_TEMPORARY_QUERY: {
      return { reservedInputValue: payload };
    }
    case TokenActions.REMOVE_TEMPORARY_QUERY: {
      return { reservedInputValue: undefined };
    }
    default:
      return state;
  }
}
