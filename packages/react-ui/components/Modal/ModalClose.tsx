import React, { useContext } from 'react';
import cn from 'classnames';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CrossIcon } from '../../internal/icons/CrossIcon';

import { CloseProps } from './ModalContext';
import { jsStyles } from './Modal.styles';

export function ModalClose({ disableClose, requestClose }: CloseProps) {
  const theme = useContext(ThemeContext);

  return (
    <button
      className={cn({
        [jsStyles.close(theme)]: true,
        [jsStyles.disabled(theme)]: disableClose,
      })}
      onClick={requestClose}
      data-tid="modal-close"
    >
      <CrossIcon />
      <span className={jsStyles.closeOutline(theme)} />
    </button>
  );
}
