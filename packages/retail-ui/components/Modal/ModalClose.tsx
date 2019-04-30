import * as React from 'react';
import classNames from 'classnames';
import { CloseProps } from './ModalContext';

import styles from './Modal.less';

const Close: React.SFC<CloseProps> = (props: CloseProps) => {
  return (
    <button
      className={classNames(styles.close, props.disableClose && styles.disabled)}
      onClick={props.requestClose}
      data-tid="modal-close"
    >
      <span className={styles.closeOutline} />
    </button>
  );
};

export default Close;
