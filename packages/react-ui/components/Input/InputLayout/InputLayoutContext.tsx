import React from 'react';

import { SizeType } from '../../../internal/ThemePlayground/constants';

export interface InputLayoutContextProps {
  focused: boolean;
  disabled: boolean;
  size: SizeType;
}

export const InputLayoutContextDefault: InputLayoutContextProps = {
  focused: false,
  disabled: false,
  size: SizeType.Small,
};

export const InputLayoutContext = React.createContext<InputLayoutContextProps>(InputLayoutContextDefault);
