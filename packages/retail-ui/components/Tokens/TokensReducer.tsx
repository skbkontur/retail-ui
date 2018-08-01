import { State } from './Tokens';

export interface TokensInputAction {
  type: TokensInputActions;
  payload?: any;
}

export type TokensInputActions =
  | 'SET_INPUT_VALUE_WIDTH'
  | 'UPDATE_QUERY'
  | 'SET_FOCUS_IN'
  | 'SET_FOCUS_OUT'
  | 'BLUR_FROM_INPUT'
  | 'BLUR_FROM_WRAPPER'
  | 'SET_AUTOCOMPLETE_ITEMS'
  | 'SET_ACTIVE_TOKENS'
  | 'REMOVE_ALL_ACTIVE_TOKENS'
  | 'CLEAR_INPUT';

export function TokensReducer<T>(state: State<T>, action: TokensInputAction) {
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
    case 'SET_FOCUS_OUT': {
      return { inFocus: false };
    }
    case 'SET_AUTOCOMPLETE_ITEMS': {
      return { autocompleteItems: payload };
    }
    case 'SET_ACTIVE_TOKENS': {
      return { activeTokens: payload };
    }
    case 'BLUR_FROM_INPUT': {
      return { inFocus: false, autocompleteItems: undefined };
    }
    case 'BLUR_FROM_WRAPPER': {
      return { inFocus: false, autocompleteItems: undefined, activeTokens: [] };
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
