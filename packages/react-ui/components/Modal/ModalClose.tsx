import React from 'react';
import cn from 'classnames';

import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { CloseProps } from './ModalContext';
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
        className={cn({
          [jsStyles.close(this.theme)]: true,
          [jsStyles.disabled(this.theme)]: this.props.disableClose,
        })}
        onClick={this.props.requestClose}
        data-tid="modal-close"
      >
        <span className={jsStyles.closeOutline(this.theme)} />
      </button>
    );
  }
}
