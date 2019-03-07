import { TokenInputState } from './TokenInput';

export interface TokenInputAction {
  type: TokenInputActionType;
  payload?: any;
}

export const TokenActions = {
  SET_INPUT_VALUE_WIDTH: 'SET_INPUT_VALUE_WIDTH',
  UPDATE_QUERY: 'UPDATE_QUERY',
  SET_FOCUS_IN: 'SET_FOCUS_IN',
  SET_PREVENT_BLUR: 'SET_PREVENT_BLUR',
  BLUR: 'BLUR',
  SET_AUTOCOMPLETE_ITEMS: 'SET_AUTOCOMPLETE_ITEMS',
  SET_ACTIVE_TOKENS: 'SET_ACTIVE_TOKENS',
  REMOVE_ALL_ACTIVE_TOKENS: 'REMOVE_ALL_ACTIVE_TOKENS',
  SET_LOADING: 'SET_LOADING',
  CLEAR_INPUT: 'CLEAR_INPUT',
};

export type TokenInputActionType = keyof typeof TokenActions;

export function tokenInputReducer<T = string>(state: TokenInputState<T>, action: TokenInputAction) {
  const payload = action.payload;
  switch (action.type) {
    case TokenActions.SET_INPUT_VALUE_WIDTH: {
      return { inputValueWidth: payload };
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

    default:
      return state;
  }
}
