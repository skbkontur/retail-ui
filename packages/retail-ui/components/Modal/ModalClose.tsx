import * as React from 'react';
import { CloseProps } from './ModalContext';
import styles from './Modal.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Modal.styles';
import { ThemeConsumer } from '../internal/ThemeContext';
import { ITheme } from '../../lib/theming/Theme';

export default class Close extends React.Component<CloseProps> {
  private theme!: ITheme;

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
