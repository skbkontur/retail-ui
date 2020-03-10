import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { CloseProps } from './ModalContext';
import styles from './Modal.module.less';
import { jsStyles } from './Modal.styles';

export function ModalClose({ disableClose, requestClose }: CloseProps) {
  const theme = useContext(ThemeContext);

  return (
    <button
      className={cx(styles.close, jsStyles.close(theme), disableClose && styles.disabled)}
      onClick={requestClose}
      data-tid="modal-close"
    >
      <span className={styles.closeOutline} />
    </button>
  );
}
