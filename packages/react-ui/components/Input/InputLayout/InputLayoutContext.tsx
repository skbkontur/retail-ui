import React from 'react';

import { SizeType } from '../../../lib/utils';

export interface InputLayoutContextProps {
  focused: boolean;
  disabled: boolean;
  size: SizeType;
}

export const InputLayoutContextDefault: InputLayoutContextProps = {
  focused: false,
  disabled: false,
  size: 'small',
};

export const InputLayoutContext = React.createContext<InputLayoutContextProps>(InputLayoutContextDefault);
