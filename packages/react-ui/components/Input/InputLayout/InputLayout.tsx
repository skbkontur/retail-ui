import React, { useContext } from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { InputDataTids, InputProps } from '../Input';
import { CommonProps, CommonWrapper } from '../../../internal/CommonWrapper';
import { EmotionContext } from '../../../lib/theming/Emotion';

import { InputLayoutAside } from './InputLayoutAside';
import { InputLayoutContext, InputLayoutContextDefault, InputLayoutContextProps } from './InputLayoutContext';
import { getStylesLayout } from './InputLayout.styles';

type InputLayoutRootFromInputProps = Pick<InputProps, 'leftIcon' | 'rightIcon' | 'prefix' | 'suffix'>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps, CommonProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  context: Partial<InputLayoutContextProps>;
}

export const InputLayout = forwardRefAndName<HTMLLabelElement, InputLayoutRootProps>('InputLayout', (props, ref) => {
  const { leftIcon, rightIcon, prefix, suffix, labelProps, context, children } = props;
  const _context: InputLayoutContextProps = { ...InputLayoutContextDefault, ...context };
  const emotion = useContext(EmotionContext);
  const stylesLayout = getStylesLayout(emotion);

  return (
    <InputLayoutContext.Provider value={_context}>
      <CommonWrapper {...props}>
        <label ref={ref} data-tid={InputDataTids.root} {...labelProps}>
          <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
          <span className={stylesLayout.input()}>{children}</span>
          <InputLayoutAside icon={rightIcon} text={suffix} side="right" />
        </label>
      </CommonWrapper>
    </InputLayoutContext.Provider>
  );
});
