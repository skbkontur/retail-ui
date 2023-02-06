import React, { useContext } from 'react';

import { InputViewType } from '../Input';
import { InputContext } from '../InputContext';

import { MaskedInputView } from './MaskedInputView';
import { NativeInputView } from './NativeInputView';

export const InputView: InputViewType = () => {
  const { mask } = useContext(InputContext);
  return React.createElement(mask ? MaskedInputView : NativeInputView);
};
