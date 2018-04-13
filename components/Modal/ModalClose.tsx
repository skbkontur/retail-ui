import * as React from 'react';
import { CloseProps } from './ModalContext';
import classNames = require('classnames');
import styles = require('./Modal.less');

export const Close: React.SFC<CloseProps> = (props: CloseProps) => {
  return (
    <a
      href="javascript:"
      className={classNames(
        styles.close,
        props.disableClose && styles.disabled
      )}
      onClick={props.requestClose}
    >
      ×
    </a>
  );
};
