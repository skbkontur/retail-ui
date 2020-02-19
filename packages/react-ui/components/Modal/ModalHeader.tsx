import React from 'react';
import cn from 'classnames';

import { Sticky } from '../Sticky';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../ZIndex';

import { jsStyles } from './Modal.styles';
import { ModalClose } from './ModalClose';
import { CloseProps, ModalContext } from './ModalContext';

export interface ModalHeaderProps {
  close?: boolean;
  sticky: boolean;
}
/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
export class ModalHeader extends React.Component<ModalHeaderProps> {
  public static __KONTUR_REACT_UI__ = 'ModalHeader';
  public static __MODAL_HEADER__ = true;

  public static defaultProps = {
    sticky: true,
  };

  private theme!: Theme;

  public render(): JSX.Element {
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
      <ZIndex style={{ position: 'relative' }} priority={'ModalHeader'}>
        <ModalContext.Consumer>
          {({ close, additionalPadding }) => {
            if (this.props.sticky) {
              return <Sticky side="top">{this.renderContent(close, additionalPadding)}</Sticky>;
            }

            return this.renderContent(close, additionalPadding)();
          }}
        </ModalContext.Consumer>
      </ZIndex>
    );
  }

  private renderContent = (close?: CloseProps, additionalPadding?: boolean) => (fixed = false) => {
    return (
      <div
        className={cn({
          [jsStyles.header()]: true,
          [jsStyles.fixedHeader(this.theme)]: fixed,
          [jsStyles.headerAddPadding()]: Boolean(additionalPadding),
        })}
      >
        {close && (
          <div className={jsStyles.absoluteClose()}>
            <ModalClose requestClose={close.requestClose} disableClose={close.disableClose} />
          </div>
        )}
        {this.props.children}
      </div>
    );
  };
}
