import React, { useContext } from 'react';

import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { styles } from '../ToastView.styles';

import { resetStyles } from './reset.styles';
import { ToastProps } from './Toast';

export type ToastActionButtonProps = Pick<ToastProps, 'action'>;

export const ToastActionButton = ({ action }: ToastActionButtonProps) => {
  const theme = useContext(ThemeContext);

  return (
    <button
      data-tid="ToastView__action"
      className={cx(resetStyles.button(), styles.link(theme))}
      onClick={action?.handler}
    >
      {action?.label}
    </button>
  );
};
