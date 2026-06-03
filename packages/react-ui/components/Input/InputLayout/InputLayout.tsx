import React from 'react';

import type { CommonProps } from '../../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../../internal/CommonWrapper/index.js';
import { forwardRefAndName } from '../../../lib/forwardRefAndName.js';
import { mergeRefs } from '../../../lib/mergeRefs.js';
import { useStyles } from '../../../lib/renderEnvironment/index.js';
import { InputDataTids } from '../Input.js';
import type { InputProps } from '../Input.js';
import { getStylesLayout } from './InputLayout.styles.js';
import { InputLayoutAside } from './InputLayoutAside.js';
import { InputLayoutAsideCounter } from './InputLayoutAsideCounter.js';
import { InputLayoutContext, InputLayoutContextDefault } from './InputLayoutContext.js';
import type { InputLayoutContextProps } from './InputLayoutContext.js';

type InputLayoutRootFromInputProps = Pick<
  InputProps,
  | 'leftIcon'
  | 'rightIcon'
  | 'prefix'
  | 'suffix'
  | 'value'
  | 'showLengthCounter'
  | 'lengthCounter'
  | 'counterHelp'
  | 'maxLength'
  | 'size'
>;

export interface InputLayoutRootProps extends InputLayoutRootFromInputProps, CommonProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> };
  context: Partial<InputLayoutContextProps>;
  isCounterVisible?: boolean;
  onCloseCounterHelp?: () => void;
  tag?: 'label' | 'span';
}

export const InputLayout = forwardRefAndName<HTMLLabelElement, InputLayoutRootProps>('InputLayout', (props, ref) => {
  const stylesLayout = useStyles(getStylesLayout);
  const {
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    value,
    showLengthCounter,
    isCounterVisible,
    lengthCounter,
    counterHelp,
    onCloseCounterHelp,
    maxLength,
    size,
    labelProps,
    context,
    children,
    tag = 'label',
  } = props;
  const _context: InputLayoutContextProps = { ...InputLayoutContextDefault, ...context };
  const Tag = tag;
  const counter =
    showLengthCounter && isCounterVisible ? (
      <InputLayoutAsideCounter
        key="counter"
        inputValue={value}
        length={maxLength ?? lengthCounter ?? 0}
        help={counterHelp}
        onCloseHelp={onCloseCounterHelp}
        size={size}
      />
    ) : undefined;

  return (
    <InputLayoutContext.Provider value={_context}>
      <CommonWrapper {...props}>
        <Tag data-tid={InputDataTids.root} {...labelProps} ref={mergeRefs(ref, labelProps.ref)}>
          <InputLayoutAside icon={leftIcon} text={prefix} side="left" />
          <span className={stylesLayout.input()}>{children}</span>
          <InputLayoutAside icon={rightIcon} text={suffix} counter={counter} side="right" />
        </Tag>
      </CommonWrapper>
    </InputLayoutContext.Provider>
  );
});
