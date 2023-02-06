import React from 'react';

import { emptyHandler } from '../../lib/utils';
import { MaskedInput } from '../../internal/MaskedInput';
import { InputProps, InputState } from '../Input';

export interface InputContextProps extends InputProps, InputState {
  refInput: (element: HTMLInputElement | MaskedInput | null) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleMaskedValueChange: (value: string) => void;
  handleUnexpectedInput: (value: string) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputContext = React.createContext<InputContextProps>({
  refInput: emptyHandler,
  handleChange: emptyHandler,
  handleFocus: emptyHandler,
  handleKeyDown: emptyHandler,
  handleKeyPress: emptyHandler,
  handleMaskedValueChange: emptyHandler,
  handleUnexpectedInput: emptyHandler,
  handleBlur: emptyHandler,
  blinking: false,
  focused: false,
  needsPolyfillPlaceholder: false,
});

InputContext.displayName = 'InputContext';
