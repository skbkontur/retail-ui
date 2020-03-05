import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { CloseProps } from './ModalContext';
import styles from './Modal.module.less';
import { jsStyles } from './Modal.styles';


export class ModalClose extends React.Component<CloseProps> {
  private theme!: Theme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    return (
      <button
        className={cx(styles.close, jsStyles.close(this.theme), this.props.disableClose && styles.disabled)}
        onClick={this.props.requestClose}
        data-tid="modal-close"
      >
        <span className={styles.closeOutline} />
      </button>
    );
  }
}
