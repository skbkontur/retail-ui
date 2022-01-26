import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';
import { isEdge, isIE11 } from '../../lib/client';
import { cx } from '../../lib/theming/Emotion';

import { CheckboxProps, CheckboxState } from './Checkbox';
import { styles } from './Checkbox.styles';

type CheckboxInterface = {
  children: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
};

export type CheckboxLabel = CheckboxInterface &
  Pick<CheckboxProps, 'disabled' | 'checked' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver'> &
  Pick<CheckboxState, 'isIndeterminate'>;

export const CheckboxLabel = ({
  children,
  disabled,
  checked,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  isIndeterminate,
  inputRef,
}: CheckboxLabel) => {
  const theme = useContext(ThemeContext);

  return (
    <label
      className={cx({
        [styles.root(theme)]: true,
        [styles.rootFallback()]: isIE11 || isEdge,
        [styles.rootChecked(theme)]: checked || isIndeterminate,
        [styles.disabled(theme)]: disabled,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onClick={fixFirefoxModifiedClickOnLabel(inputRef)}
    >
      {children}
    </label>
  );
};
