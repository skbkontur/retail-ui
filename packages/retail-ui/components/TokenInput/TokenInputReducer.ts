import { TokenInputState } from './TokenInput';

export interface TokenInputAction {
  type: TokenInputActionType;
  payload?: any;
}

export type TokenInputActionType =
  | 'SET_INPUT_VALUE_WIDTH'
  | 'UPDATE_QUERY'
  | 'SET_FOCUS_IN'
  | 'SET_PREVENT_BLUR'
  | 'BLUR'
  | 'SET_AUTOCOMPLETE_ITEMS'
  | 'SET_ACTIVE_TOKENS'
  | 'REMOVE_ALL_ACTIVE_TOKENS'
  | 'CLEAR_INPUT';

export function tokenInputReducer<T>(
  state: TokenInputState<T>,
  action: TokenInputAction
) {
  const payload = action.payload;
  switch (action.type) {
    case 'SET_INPUT_VALUE_WIDTH': {
      return { inputValueWidth: payload };
    }
    case 'UPDATE_QUERY': {
      return { inputValue: payload };
    }
    case 'SET_FOCUS_IN': {
      return { inFocus: true };
    }
    case 'SET_PREVENT_BLUR': {
      return { preventBlur: payload };
    }
    case 'SET_AUTOCOMPLETE_ITEMS': {
      return { autocompleteItems: payload };
    }
    case 'SET_ACTIVE_TOKENS': {
      return { activeTokens: payload };
    }
    case 'BLUR': {
      return {
        inFocus: false,
        preventBlur: false,
        autocompleteItems: undefined,
        activeTokens: []
      };
    }
    case 'REMOVE_ALL_ACTIVE_TOKENS': {
      return { activeTokens: [] };
    }
    case 'CLEAR_INPUT': {
      return { inputValue: '', autocompleteItems: undefined };
    }

    default:
      return state;
  }
}
