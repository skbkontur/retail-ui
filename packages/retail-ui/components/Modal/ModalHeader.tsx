import * as React from 'react';
import { ModalContext, CloseProps } from './ModalContext';
import Sticky from '../Sticky';
import Close from './ModalClose';

import styles from './Modal.less';

import { cx as classNames } from 'emotion';
import ThemeManager from '../../lib/ThemeManager';
import jsStyles from './Modal.styles';

export interface HeaderProps {
  close?: boolean;
  sticky: boolean;
}

export class Header extends React.Component<HeaderProps> {
  public static __MODAL_HEADER__ = true;

  public static defaultProps = {
    sticky: true,
  };

  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ close, additionalPadding }) => {
          if (this.props.sticky) {
            return (
              <Sticky side="top" allowChildWithMargins>
                {this.renderContent(close, additionalPadding)}
              </Sticky>
            );
          }

          return this.renderContent(close, additionalPadding)();
        }}
      </ModalContext.Consumer>
    );
  }

  private renderContent = (close?: CloseProps, additionalPadding?: boolean) => (fixed = false) => {
    const theme = ThemeManager.getTheme();

    return (
      <div
        className={classNames({
          [styles.header]: true,
          [styles.fixedHeader]: fixed,
          [jsStyles.fixedHeader(theme)]: fixed,
          [styles.headerAddPadding]: !!additionalPadding,
        })}
      >
        {close && (
          <div className={styles.absoluteClose}>
            <Close requestClose={close.requestClose} disableClose={close.disableClose} />
          </div>
        )}
        {this.props.children}
      </div>
    );
  };
}

export function isHeader(child: React.ReactChild): child is React.ReactElement<HeaderProps> {
  return React.isValidElement<HeaderProps>(child) && child.type.hasOwnProperty('__MODAL_HEADER__');
}
