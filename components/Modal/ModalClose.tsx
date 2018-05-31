import * as React from 'react';
import { CloseProps } from './ModalContext';
import classNames from 'classnames';
import styles = require('./Modal.less');

export const Close: React.SFC<CloseProps> = (props: CloseProps) => {
  return (
    <button
      className={classNames(
        styles.close,
        props.disableClose && styles.disabled
      )}
      onClick={props.requestClose}
    >
      ×
    </button>
  );
};
