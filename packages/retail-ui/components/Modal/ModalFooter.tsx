import * as React from 'react';
import classNames from 'classnames';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import Sticky from '../Sticky/Sticky';
import { ModalContext } from './ModalContext';

import styles from './Modal.less';

export interface FooterProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
  sticky: boolean;
}

/**
 * Футер модального окна.
 */
export class Footer extends React.Component<FooterProps> {
  public static __MODAL_FOOTER__ = true;

  public static defaultProps = {
    sticky: true,
  };

  private scrollbarWidth = getScrollWidth();

  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ horizontalScroll }) => {
          if (this.props.sticky) {
            return (
              <Sticky side="bottom" offset={horizontalScroll ? this.scrollbarWidth : 0} allowChildWithMargins>
                {this.renderContent(horizontalScroll)}
              </Sticky>
            );
          }

          return this.renderContent(horizontalScroll)();
        }}
      </ModalContext.Consumer>
    );
  }

  private renderContent = (horizontalScroll?: boolean) => (fixed = false) => {
    const className = classNames(styles.footer, {
      [styles.panel]: this.props.panel,
      [styles.fixedFooter]: fixed,
    });

    return <div className={className}>{this.props.children}</div>;
  };
}

export function isFooter(child: React.ReactChild): child is React.ReactElement<FooterProps> {
  return React.isValidElement<FooterProps>(child) && child.type.hasOwnProperty('__MODAL_FOOTER__');
}
