import * as React from 'react';
import { ModalContext } from './ModalContext';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import ZIndex from '../ZIndex';
import Close from './ModalClose';

export class Body extends React.Component {
  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader, close }) => (
          <ZIndex
            priority={'ModalBody'}
            createStackingContext
            className={cx(
              styles.body,
              !hasHeader && styles.bodyWithoutHeader,
              additionalPadding && styles.bodyAddPadding,
              !hasHeader && close && styles.bodyWithoutHeaderWithClose,
            )}
          >
            {!hasHeader && close ? (
              <Close requestClose={close.requestClose} disableClose={close.disableClose} />
            ) : null}
            {this.props.children}
          </ZIndex>
        )}
      </ModalContext.Consumer>
    );
  }
}
