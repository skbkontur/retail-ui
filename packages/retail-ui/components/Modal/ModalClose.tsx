import * as React from 'react';
import { CloseProps } from './ModalContext';
import styles from './Modal.less';
import { cx as classNames } from 'emotion';
import ThemeManager from '../../lib/ThemeManager';
import jsStyles from './Modal.styles';

export default class Close extends React.Component<CloseProps> {
  public render() {
    const theme = ThemeManager.getTheme();
    return (
      <button
        className={classNames(styles.close, jsStyles.close(theme), this.props.disableClose && styles.disabled)}
        onClick={this.props.requestClose}
		data-tid="modal-close"
      >
        <span className={styles.closeOutline} />
      </button>
    );
  }
}
