import * as React from 'react';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import classNames from 'classnames';
import Sticky from '../Sticky';
import styles = require('./Modal.less');
import { ModalContext } from './ModalContext';

export interface FooterProps {
  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
}

/**
 * Футер модального окна.
 */
export class Footer extends React.Component<FooterProps> {
  private scrollbarWidth = getScrollWidth();

  public render() {
    const names = classNames({
      [styles.footer]: true,
      [styles.panel]: this.props.panel
    });

    return (
      <ModalContext.Consumer>
        {({ horizontalScroll }) => (
          <Sticky
            side="bottom"
            offset={horizontalScroll ? this.scrollbarWidth : 0}
          >
            {fixed => (
              <div className={classNames(names, fixed && styles.fixedFooter)}>
                {this.props.children}
              </div>
            )}
          </Sticky>
        )}
      </ModalContext.Consumer>
    );
  }
}
