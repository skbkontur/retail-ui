import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';
import { isEdge, isIE11 } from '../../lib/client';
import { cx } from '../../lib/theming/Emotion';

import { CheckboxProps, CheckboxRef, CheckboxState } from './Checkbox';
import { styles } from './Checkbox.styles';

type CheckboxInterface = {
  children: React.ReactNode;
};

export type CheckboxLabel = CheckboxInterface &
  Pick<CheckboxRef, 'inputRef'> &
  Pick<
    CheckboxProps,
    'disabled' | 'checked' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver' | 'className' | 'style'
  > &
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
  className,
  style,
  ...rest
}: CheckboxLabel) => {
  const theme = useContext(ThemeContext);

  return (
    <label
      className={cx(
        {
          [styles.root(theme)]: true,
          [styles.rootFallback()]: isIE11 || isEdge,
          [styles.rootChecked(theme)]: checked || isIndeterminate,
          [styles.disabled(theme)]: disabled,
        },
        className,
      )}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onClick={fixFirefoxModifiedClickOnLabel(inputRef)}
      {...rest}
    >
      {children}
    </label>
  );
};
