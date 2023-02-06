import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { Theme } from '../../../lib/theming/Theme';
import { cx } from '../../../lib/theming/Emotion';
import { isIE11, isEdge } from '../../../lib/client';

import { InputDataTids, InputProps, InputViewType } from '../Input';
import { styles } from '../Input.styles';
import { InputContext } from '../InputContext';

const getSizeClassName = (size: InputProps['size'], theme: Theme) => {
  switch (size) {
    case 'large':
      return cx({
        [styles.sizeLarge(theme)]: true,
        [styles.sizeLargeFallback(theme)]: isIE11 || isEdge,
      });
    case 'medium':
      return cx({
        [styles.sizeMedium(theme)]: true,
        [styles.sizeMediumFallback(theme)]: isIE11 || isEdge,
      });
    case 'small':
    default:
      return cx({
        [styles.sizeSmall(theme)]: true,
        [styles.sizeSmallFallback(theme)]: isIE11 || isEdge,
      });
  }
};

export const RootView: InputViewType = ({ children }) => {
  const theme = useContext(ThemeContext);
  const {
    size,
    borderless,
    disabled,
    warning,
    error,
    width,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    focused,
    blinking,
  } = useContext(InputContext);

  const className = cx(styles.root(theme), getSizeClassName(size, theme), {
    [styles.focus(theme)]: focused,
    [styles.blink(theme)]: blinking,
    [styles.borderless()]: borderless && !focused,
    [styles.disabled(theme)]: disabled,
    [styles.warning(theme)]: warning,
    [styles.error(theme)]: error,
    [styles.focusFallback(theme)]: focused && (isIE11 || isEdge),
    [styles.warningFallback(theme)]: warning && (isIE11 || isEdge),
    [styles.errorFallback(theme)]: error && (isIE11 || isEdge),
  });

  const style = { width };

  return React.createElement('label', {
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    className,
    style,
    children,
    ['data-tid']: InputDataTids.root,
  });
};
