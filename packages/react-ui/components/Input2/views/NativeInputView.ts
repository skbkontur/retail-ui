import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { InputViewType } from '../Input';
import { InputContext } from '../InputContext';
import { getInputProps } from '../utils';

export const NativeInputView: InputViewType = () => {
  const theme = useContext(ThemeContext);
  const inputContext = useContext(InputContext);
  const inputProps = getInputProps(inputContext, theme);

  return React.createElement('input', inputProps);
};
