import React from 'react';

import { InputProps } from '../Input';

interface InputLayoutContextProps {
  focused: boolean;
  disabled: boolean;
  size: InputProps['size'];
}

export const InputLayoutContext = React.createContext<InputLayoutContextProps>({
  focused: false,
  disabled: false,
  size: 'small',
});
