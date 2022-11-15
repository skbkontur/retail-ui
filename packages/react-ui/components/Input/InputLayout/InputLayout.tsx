import React from 'react';

import { InputDataTids, InputProps } from '../Input';

import { InputLayoutAside } from './InputLayoutAside';
import { InputLayoutContext, InputLayoutContextDefault, InputLayoutContextProps } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

type InputLayoutRootFromInputProps = Pick<InputProps, 'leftIcon' | 'rightIcon' | 'prefix' | 'suffix'>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  context: Partial<InputLayoutContextProps>;
}

export const InputLayout: React.FunctionComponent<InputLayoutRootProps> = ({
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  labelProps,
  context,
  children,
}) => {
  const _context: InputLayoutContextProps = { ...InputLayoutContextDefault, ...context };

  return (
    <InputLayoutContext.Provider value={_context}>
      <label data-tid={InputDataTids.root} {...labelProps}>
        <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
        <span className={stylesLayout.input()}>{children}</span>
        <InputLayoutAside icon={rightIcon} text={suffix} side="right" />
      </label>
    </InputLayoutContext.Provider>
  );
};
