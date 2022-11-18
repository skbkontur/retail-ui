import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { XIcon } from '../icons/16px/Icons2022';
import { css, cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';

import { styles } from './CloseIcon.styles';

interface CloseIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  side?: number;
  disableCompensation?: boolean;
  color?: string;
  colorHover?: string;
  theme: Theme;
}

export const CloseIcon: React.FunctionComponent<CloseIconProps> = ({
  theme,
  side = 40,
  size = 16,
  color,
  colorHover,
  disableCompensation,
  disabled,
  ...attr
}) => {
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

  const classNames = css`
    color: ${color};
    &:focus,
    &:hover {
      color: ${colorHover};
    }
  `;

  return (
    <button
      tabIndex={disabled ? -1 : 0}
      className={cx(styles.wrapper(theme), classNames, focusedByTab && styles.focus(theme))}
      style={{ width: side, height: side }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...attr}
    >
      <span className={styles.root()}>
        <XIcon size={side < size ? side : size} disableCompensation={disableCompensation} />
      </span>
    </button>
  );
};
