import React from 'react';

import { InputSize } from '../Input';

export interface InputLayoutContextProps {
  focused: boolean;
  disabled: boolean;
  size: InputSize;
}

export const InputLayoutContextDefault: InputLayoutContextProps = {
  focused: false,
  disabled: false,
  size: 'small',
};

export const InputLayoutContext = React.createContext<InputLayoutContextProps>(InputLayoutContextDefault);
