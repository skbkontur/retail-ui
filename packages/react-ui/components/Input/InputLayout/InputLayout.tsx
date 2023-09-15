import React from 'react';
import { HTMLLabelElement } from '@skbkontur/global-object/lib';

import { InputDataTids, InputProps } from '../Input';
import { CommonWrapper } from '../../../internal/CommonWrapper';

import { InputLayoutAside } from './InputLayoutAside';
import { InputLayoutContext, InputLayoutContextDefault, InputLayoutContextProps } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

type InputLayoutRootFromInputProps = Pick<InputProps, 'leftIcon' | 'rightIcon' | 'prefix' | 'suffix'>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  context: Partial<InputLayoutContextProps>;
}

export const InputLayout: React.FunctionComponent<InputLayoutRootProps> = (props) => {
  const { leftIcon, rightIcon, prefix, suffix, labelProps, context, children } = props;
  const _context: InputLayoutContextProps = { ...InputLayoutContextDefault, ...context };

  return (
    <InputLayoutContext.Provider value={_context}>
      <CommonWrapper {...props}>
        <label data-tid={InputDataTids.root} {...labelProps}>
          <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
          <span className={stylesLayout.input()}>{children}</span>
          <InputLayoutAside icon={rightIcon} text={suffix} side="right" />
        </label>
      </CommonWrapper>
    </InputLayoutContext.Provider>
  );
};
