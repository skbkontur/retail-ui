import React from 'react';

import { InputDataTids, InputProps } from '../Input';

import { InputLayoutAside } from './InputLayoutAside';
import { stylesLayout } from './InputLayout.styles';

type InputLayoutRootFromInputProps = Pick<InputProps, 'leftIcon' | 'rightIcon' | 'prefix' | 'suffix'>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const InputLayout: React.FunctionComponent<InputLayoutRootProps> = ({
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  labelProps,
  children,
}) => {
  return (
    <label data-tid={InputDataTids.root} {...labelProps}>
      <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
      <span className={stylesLayout.input()}>{children}</span>
      <InputLayoutAside icon={rightIcon} text={suffix} side="right" />
    </label>
  );
};
