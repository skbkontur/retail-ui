import React, { useContext } from 'react';

import { InputProps } from '../Input';
import { EmotionContext } from '../../../lib/theming/Emotion';
import { getStyles } from '../Input.styles';
import { needsPolyfillPlaceholder } from '../../../lib/needsPolyfillPlaceholder';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

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
  const emotion = useContext(EmotionContext);
  const theme = useContext(ThemeContext);
  const { focused, disabled } = React.useContext(InputLayoutContext);

  let _placeholder = null;
  const styles = getStyles(emotion);

  if (needsPolyfillPlaceholder && placeholder && !isMaskVisible && !value && !defaultValue) {
    _placeholder = (
      <div
        className={emotion.cx(styles.placeholder(theme), {
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
