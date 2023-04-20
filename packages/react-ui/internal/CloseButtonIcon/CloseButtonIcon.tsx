import React, { CSSProperties } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { DEFAULT_ICON_SIZE } from '../icons2022/iconConstants';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';

import { styles } from './CloseButtonIcon.styles';
import { CrossIcon } from './CrossIcon';

interface CloseIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  side?: number;
  disableCompensation?: boolean;
  color?: CSSProperties['color'];
  colorHover?: CSSProperties['color'];
  focusable?: boolean;
}

export const CloseButtonIcon: React.FunctionComponent<CloseIconProps> = ({
  side = DEFAULT_ICON_SIZE,
  size = DEFAULT_ICON_SIZE,
  color,
  colorHover,
  disableCompensation,
  focusable = true,
  ...rest
}) => {
  const _theme = React.useContext(ThemeContext);
  const theme = ThemeFactory.create(
    {
      closeBtnIconColor: color ?? _theme.closeBtnIconColor,
      closeBtnIconHoverColor: colorHover ?? _theme.closeBtnIconHoverColor,
    },
    _theme,
  );
  const [focusedByTab, setFocusedByTab] = React.useState(false);

  const handleFocus = () => {
    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    requestAnimationFrame(() => {
      if (keyListener.isTabPressed) {
        setFocusedByTab(true);
      }
    });
  };
  const handleBlur = () => setFocusedByTab(false);

  const tabIndex = !focusable || rest.disabled ? -1 : 0;

  return (
    <button
      tabIndex={tabIndex}
      className={cx(
        styles.root(theme),
        !rest.disabled && focusedByTab && styles.focus(theme),
        rest.disabled && styles.rootDisabled(theme),
      )}
      style={{ width: side, height: side }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      <span className={styles.wrapper()} style={{ fontSize: size }}>
        <CrossIcon size={side < size ? side : size} disableCompensation={disableCompensation} />
      </span>
    </button>
  );
};
