import * as React from 'react';
import { ModalContext } from './ModalContext';
import Sticky from '../Sticky';
import classNames from 'classnames';
import Close from './ModalClose';

import styles = require('./Modal.less');

export interface HeaderProps {
  close?: boolean;
}

export class Header extends React.Component<HeaderProps> {
  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ close, additionalPadding }) => (
          <Sticky side="top" allowChildWithMargins>
            {fixed => (
              <div
                className={classNames(
                  styles.header,
                  fixed && styles.fixedHeader,
                  additionalPadding && styles.headerAddPadding
                )}
              >
                {close && (
                  <div className={styles.absoluteClose}>
                    <Close
                      requestClose={close.requestClose}
                      disableClose={close.disableClose}
                    />
                  </div>
                )}
                {this.props.children}
              </div>
            )}
          </Sticky>
        )}
      </ModalContext.Consumer>
    );
  }
}
