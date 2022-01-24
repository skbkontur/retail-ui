import React, { useContext } from 'react';

import { cx } from '../../../lib/theming/Emotion';
import { CrossIcon } from '../../../internal/icons/CrossIcon';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { styles } from '../ToastView.styles';

import { resetStyles } from './reset.styles';

export type ToastCloseButtonProps = {
  onClick: () => void;
};

export const ToastCloseButton = ({ onClick }: ToastCloseButtonProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span className={styles.closeWrapper(theme)}>
      <button data-tid="ToastView__close" className={cx(resetStyles.button(), styles.close(theme))} onClick={onClick}>
        <CrossIcon />
      </button>
    </span>
  );
};
