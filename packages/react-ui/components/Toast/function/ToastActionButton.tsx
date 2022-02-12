import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { styles } from '../ToastView.styles';

import { ToastProps } from './Toast';

export type ToastActionButtonProps = Pick<ToastProps, 'action'>;

export const ToastActionButton = ({ action }: ToastActionButtonProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span data-tid="ToastView__action" className={styles.link(theme)} onClick={action?.handler}>
      {action?.label}
    </span>
  );
};
