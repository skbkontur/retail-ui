import * as React from 'react';
import { ModalContext } from './ModalContext';
import styles from './Modal.module.less';
import { cx } from '../../lib/theming/Emotion';
import ZIndex from '../ZIndex';

/**
 * Контейнер с отступами от края модалки
 *
 * @visibleName Modal.Body
 */
export class Body extends React.Component {
  public static __KONTUR_REACT_UI__ = 'ModalBody';
  public static __MODAL_BODY__ = true;

  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader }) => (
          <ZIndex
            priority={'ModalBody'}
            createStackingContext
            className={cx(
              styles.body,
              !hasHeader && styles.bodyWithoutHeader,
              additionalPadding && styles.bodyAddPadding,
            )}
          >
            {this.props.children}
          </ZIndex>
        )}
      </ModalContext.Consumer>
    );
  }
}
