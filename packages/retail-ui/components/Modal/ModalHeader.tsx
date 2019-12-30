import * as React from 'react';
import { CloseProps, ModalContext } from './ModalContext';
import { Sticky } from '../Sticky';
import { ModalClose } from './ModalClose';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import { jsStyles } from './Modal.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../ZIndex';

export interface HeaderProps {
  close?: boolean;
  sticky: boolean;
}

export class Header extends React.Component<HeaderProps> {
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
        className={cx({
          [styles.header]: true,
          [styles.fixedHeader]: fixed,
          [jsStyles.fixedHeader(this.theme)]: fixed,
          [styles.headerAddPadding]: !!additionalPadding,
        })}
      >
        {close && (
          <div className={styles.absoluteClose}>
            <ModalClose requestClose={close.requestClose} disableClose={close.disableClose} />
          </div>
        )}
        {this.props.children}
      </div>
    );
  };
}

export function isHeader(child: React.ReactNode): child is React.ReactElement<HeaderProps> {
  return React.isValidElement<HeaderProps>(child) && child.type.hasOwnProperty('__MODAL_HEADER__');
}
