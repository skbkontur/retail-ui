import React from 'react';

import type { InputProps } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { styles } from '../Input.styles';
import { needsPolyfillPlaceholder } from '../../../lib/needsPolyfillPlaceholder';

import { InputLayoutContext } from './InputLayoutContext';

type PolyfillPlaceholder = Pick<InputProps, 'placeholder' | 'value' | 'defaultValue' | 'align'> & {
  isMaskVisible: boolean;
};

export interface InputLayoutPlaceholderProps extends PolyfillPlaceholder {
  children: InputProps['placeholder'];
}

export const PolyfillPlaceholder: React.FunctionComponent<InputLayoutPlaceholderProps> = ({
  children: placeholder,
  align,
  value,
  defaultValue,
  isMaskVisible,
}) => {
  const theme = React.useContext(ThemeContext);
  const { focused, disabled } = React.useContext(InputLayoutContext);

  let _placeholder = null;

  if (needsPolyfillPlaceholder && placeholder && !isMaskVisible && !value && !defaultValue) {
    _placeholder = (
      <div
        className={cx(styles.placeholder(theme), {
          [styles.placeholderDisabled(theme)]: disabled,
          [styles.placeholderFocus(theme)]: focused,
        })}
        style={{ textAlign: align || 'inherit' }}
      >
        {placeholder}
      </div>
    );
  }

  return _placeholder;
};
