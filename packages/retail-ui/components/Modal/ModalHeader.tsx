import * as React from 'react';
import { ModalContext, CloseProps } from './ModalContext';
import Sticky from '../Sticky';
import Close from './ModalClose';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Modal.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
import ZIndex from '../ZIndex';

export interface HeaderProps {
  close?: boolean;
  sticky: boolean;
}
/**
 * Шапка модального окна
 *
 * @visibleName Modal.Header
 */
export class Header extends React.Component<HeaderProps> {
  public static __KONTUR_REACT_UI__ = 'ModalHeader';
  public static __MODAL_HEADER__ = true;

  public static defaultProps = {
    sticky: true,
  };

  private theme!: ITheme;

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
            <Close requestClose={close.requestClose} disableClose={close.disableClose} />
          </div>
        )}
        {this.props.children}
      </div>
    );
  };
}
