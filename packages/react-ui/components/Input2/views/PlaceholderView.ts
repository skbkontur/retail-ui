import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { cx } from '../../../lib/theming/Emotion';
import { InputViewType } from '../Input';
import { styles } from '../Input.styles';
import { isMaskVisible } from '../utils';
import { InputContext } from '../InputContext';

export const PlaceholderView: InputViewType = () => {
  const theme = useContext(ThemeContext);
  const inputContext = useContext(InputContext);
  const { disabled, placeholder, value, defaultValue, align, focused, needsPolyfillPlaceholder } = inputContext;
  const usePolyfill =
    needsPolyfillPlaceholder && placeholder && !isMaskVisible(inputContext) && !value && !defaultValue;
  const className = cx(styles.placeholder(theme), {
    [styles.placeholderDisabled(theme)]: disabled,
    [styles.placeholderFocus(theme)]: focused,
  });
  const style = { textAlign: align || 'inherit' };

  return usePolyfill ? React.createElement('div', { className, style }, placeholder) : null;
};
