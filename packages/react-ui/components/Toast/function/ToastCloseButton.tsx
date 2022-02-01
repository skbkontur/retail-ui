import React, { useContext } from 'react';

import { CrossIcon } from '../../../internal/icons/CrossIcon';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { styles } from '../ToastView.styles';

export type ToastCloseButtonProps = {
  onClick: () => void;
};

export const ToastCloseButton = ({ onClick }: ToastCloseButtonProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span className={styles.closeWrapper(theme)}>
      <span data-tid="ToastView__close" className={styles.close(theme)} onClick={onClick}>
        <CrossIcon />
      </span>
    </span>
  );
};
