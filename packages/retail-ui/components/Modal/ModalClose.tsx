import * as React from 'react';
import { CloseProps } from './ModalContext';

import styles from './Modal.less';

import { cx as classNames } from 'emotion';
import ThemeManager from '../../lib/ThemeManager';
import jsStyles from './Modal.styles';

const Close: React.SFC<CloseProps> = (props: CloseProps) => {
  const theme = ThemeManager.getTheme();
  return (
    <button
      className={classNames(styles.close, jsStyles.close(theme), props.disableClose && styles.disabled)}
      onClick={props.requestClose}
    >
      <span className={styles.closeOutline} />
    </button>
  );
};

export default Close;
