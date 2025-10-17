import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import type { InputProps } from '../Input';
import { InputDataTids } from '../Input';
import type { CommonProps } from '../../../internal/CommonWrapper';
import { CommonWrapper } from '../../../internal/CommonWrapper';

import { InputLayoutAside } from './InputLayoutAside';
import type { InputLayoutContextProps } from './InputLayoutContext';
import { InputLayoutContext, InputLayoutContextDefault } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

type InputLayoutRootFromInputProps = Pick<InputProps, 'leftIcon' | 'rightIcon' | 'prefix' | 'suffix'>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps, CommonProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  context: Partial<InputLayoutContextProps>;
  tag?: 'label' | 'span';
}

export const InputLayout = forwardRefAndName<HTMLLabelElement, InputLayoutRootProps>('InputLayout', (props, ref) => {
  const { leftIcon, rightIcon, prefix, suffix, labelProps, context, children, tag = 'label' } = props;
  const _context: InputLayoutContextProps = { ...InputLayoutContextDefault, ...context };
  const Tag = tag;

  return (
    <InputLayoutContext.Provider value={_context}>
      <CommonWrapper {...props}>
        <Tag ref={ref} data-tid={InputDataTids.root} {...labelProps}>
          <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
          <span className={stylesLayout.input()}>{children}</span>
          <InputLayoutAside icon={rightIcon} text={suffix} side="right" />
        </Tag>
      </CommonWrapper>
    </InputLayoutContext.Provider>
  );
});
