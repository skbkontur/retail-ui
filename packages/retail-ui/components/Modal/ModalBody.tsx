import * as React from 'react';
import classNames from 'classnames';
import { ModalContext } from './ModalContext';

import styles from './Modal.less';

export class Body extends React.Component {
  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader }) => (
          <div
            className={classNames(
              styles.body,
              !hasHeader && styles.bodyWithoutHeader,
              additionalPadding && styles.bodyAddPadding
            )}
          >
            {this.props.children}
          </div>
        )}
      </ModalContext.Consumer>
    );
  }
}
