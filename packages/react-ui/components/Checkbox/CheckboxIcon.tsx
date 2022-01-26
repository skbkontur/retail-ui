import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { OkIcon, SquareIcon } from '../../internal/icons/16px';
import { isEdge, isFirefox, isIE11 } from '../../lib/client';

import { CheckboxProps, CheckboxState } from './Checkbox';
import { styles } from './Checkbox.styles';

export type CheckboxIconProps = Pick<CheckboxProps, 'checked'> & Pick<CheckboxState, 'isIndeterminate'>;

export const CheckboxIcon = ({ isIndeterminate, checked }: CheckboxIconProps) => {
  const iconClass = cx({
    [styles.iconUnchecked()]: !checked && !isIndeterminate,
    [styles.iconFixBaseline()]: isFirefox || isIE11 || isEdge,
  });

  if (isIndeterminate) {
    return <SquareIcon className={iconClass} />;
  }

  return <OkIcon className={iconClass} />;
};
