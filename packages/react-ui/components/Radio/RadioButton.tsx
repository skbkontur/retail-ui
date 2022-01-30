import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { useRadioGroup } from '../RadioGroup/useRadioGroup';

import { RadioProps, RadioState } from './Radio';
import { styles, globalClasses } from './Radio.styles';

export type RadioButtonProps = Pick<RadioState, 'isFocusedByKeyboard'> &
  Pick<RadioProps, 'checked' | 'focused' | 'error' | 'warning' | 'disabled' | 'value'>;

export const RadioButton = ({
  checked,
  focused,
  isFocusedByKeyboard,
  error,
  warning,
  disabled,
  value,
}: RadioButtonProps) => {
  const theme = useContext(ThemeContext);

  const { returnContentIfInRadioGroup, isRadioGroupChecked } = useRadioGroup(value);

  const inRadioGroupClasses = returnContentIfInRadioGroup({
    [styles.checked(theme)]: isRadioGroupChecked || checked,
    [styles.checkedDisabled(theme)]: isRadioGroupChecked && disabled,
  });

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
        ...inRadioGroupClasses,
      })}
    >
      <span className={styles.placeholder()} />
    </span>
  );
};
