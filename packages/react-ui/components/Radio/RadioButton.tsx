import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { RadioProps } from './Radio';
import { styles, globalClasses } from './Radio.styles';

type RadioButtonInterface = {
  isFocusedByKeyboard: boolean;
  isInRadioGroup: boolean;
  isRadioGroupChecked: boolean;
};

export type RadioButtonProps = RadioButtonInterface &
  Pick<RadioProps, 'checked' | 'focused' | 'error' | 'warning' | 'disabled'>;

export const RadioButton = ({
  checked,
  focused,
  isFocusedByKeyboard,
  error,
  warning,
  disabled,
  isInRadioGroup,
  isRadioGroupChecked,
}: RadioButtonProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx({
        [styles.radio(theme)]: true,
        [styles.checked(theme)]: checked,
        [styles.focus(theme)]: focused || isFocusedByKeyboard,
        [styles.error(theme)]: error,
        [styles.warning(theme)]: warning,
        [styles.disabled(theme)]: disabled,
        [styles.checkedDisabled(theme)]: checked && disabled,
        [globalClasses.radio]: true,
        [styles.checked(theme)]: isInRadioGroup && isRadioGroupChecked,
        [styles.checkedDisabled(theme)]: isInRadioGroup && isRadioGroupChecked && disabled,
      })}
    >
      <span className={styles.placeholder()} />
    </span>
  );
};
