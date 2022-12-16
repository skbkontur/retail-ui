import React, { CSSProperties } from 'react';

import { css, cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { DEFAULT_ICON_SIZE } from '../icons2022/iconConstants';

import { styles } from './CloseIcon.styles';
import { CrossIcon } from './CrossIcon';

interface CloseIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  side?: number;
  disableCompensation?: boolean;
  color?: CSSProperties['color'];
  colorHover?: string;
  focusable?: boolean;
}

export const CloseButtonIcon: React.FunctionComponent<CloseIconProps> = ({
  side = DEFAULT_ICON_SIZE,
  size = DEFAULT_ICON_SIZE,
  color,
  colorHover,
  disableCompensation,
  disabled,
  focusable = true,
  ...attr
}) => {
  const theme = React.useContext(ThemeContext);
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

  const classNames =
    color || colorHover
      ? css`
          color: ${color};
          &:focus,
          &:hover {
            color: ${colorHover};
          }
        `
      : '';

  const tabIndex = !focusable || disabled ? -1 : 0;

  return (
    <button
      tabIndex={tabIndex}
      className={cx(styles.root(theme), classNames, focusedByTab && styles.focus(theme))}
      style={{ width: side, height: side }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...attr}
    >
      <span className={styles.wrapper()} style={{ fontSize: size }}>
        <CrossIcon size={side < size ? side : size} disableCompensation={disableCompensation} />
      </span>
    </button>
  );
};
