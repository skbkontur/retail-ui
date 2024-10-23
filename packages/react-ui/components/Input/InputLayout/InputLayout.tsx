import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { InputDataTids, InputProps } from '../Input';
import { CommonProps, CommonWrapper } from '../../../internal/CommonWrapper';

import { InputLayoutAside } from './InputLayoutAside';
import { InputLayoutContext, InputLayoutContextDefault, InputLayoutContextProps } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';
import { CleanCrossIcon } from '../../../internal/CleanCrossIcon/CleanCrossIcon';

type InputLayoutRootFromInputProps = Pick<
  InputProps,
  'showCleanCross' | 'leftIcon' | 'rightIcon' | 'prefix' | 'suffix'
>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps, CommonProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  context: Partial<InputLayoutContextProps>;
  clearInput: () => void;
}

export const InputLayout = forwardRefAndName<HTMLLabelElement, InputLayoutRootProps>('InputLayout', (props, ref) => {
  const { showCleanCross, clearInput, leftIcon, rightIcon, prefix, suffix, labelProps, context, children } = props;
  const _context: InputLayoutContextProps = { ...InputLayoutContextDefault, ...context };

  const cleanCrossIcon = showCleanCross ? <CleanCrossIcon size={_context.size} onClick={clearInput} /> : undefined;

  return (
    <InputLayoutContext.Provider value={_context}>
      <CommonWrapper {...props}>
        <label ref={ref} data-tid={InputDataTids.root} {...labelProps}>
          <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
          <span className={stylesLayout.input()}>{children}</span>
          {showCleanCross && !rightIcon /*&& context.focused*/ ? (
            <InputLayoutAside icon={cleanCrossIcon} text={suffix} side="right" />
          ) : (
            <InputLayoutAside icon={rightIcon} text={suffix} side="right" />
          )}
        </label>
      </CommonWrapper>
    </InputLayoutContext.Provider>
  );
});
