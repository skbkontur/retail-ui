import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { CheckboxProps, CheckboxState } from './Checkbox';
import { styles, globalClasses } from './Checkbox.styles';
import { CheckboxIcon } from './CheckboxIcon';

export type InputBoxProps = Pick<CheckboxState, 'isIndeterminate' | 'isFocusedByTab'> &
  Pick<CheckboxProps, 'checked' | 'disabled' | 'error' | 'warning'>;

export const InputBox = ({ checked, disabled, error, warning, isIndeterminate, isFocusedByTab }: InputBoxProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx(styles.box(theme), globalClasses.box, {
        [styles.boxChecked(theme)]: checked || isIndeterminate,
        [styles.boxDisabled(theme)]: disabled,
        [styles.boxFocus(theme)]: isFocusedByTab,
        [styles.boxError(theme)]: error,
        [styles.boxWarning(theme)]: warning,
      })}
    >
      <CheckboxIcon isIndeterminate={isIndeterminate} checked={checked} />
    </span>
  );
};
