import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CrossIcon } from '../../internal/icons/CrossIcon';
import { cx } from '../../lib/theming/Emotion';

import { CloseProps } from './ModalContext';
import { styles } from './Modal.styles';

export function ModalClose({ disableClose, requestClose }: CloseProps) {
  const theme = useContext(ThemeContext);

  return (
    <button
      className={cx({
        [styles.close(theme)]: true,
        [styles.disabled(theme)]: disableClose,
      })}
      onClick={requestClose}
      data-tid="modal-close"
    >
      <CrossIcon />
    </button>
  );
}
