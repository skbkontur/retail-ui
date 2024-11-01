import React from 'react';

import type { SizeProp } from '../../../lib/types/props';

export interface InputLayoutContextProps {
  focused: boolean;
  disabled: boolean;
  size: SizeProp;
}

export const InputLayoutContextDefault: InputLayoutContextProps = {
  focused: false,
  disabled: false,
  size: 'small',
};

export const InputLayoutContext = React.createContext<InputLayoutContextProps>(InputLayoutContextDefault);
