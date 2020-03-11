import React from 'react';
import cn from 'classnames';

import { ZIndex } from '../ZIndex';

import { ModalContext } from './ModalContext';
import { jsStyles } from './Modal.styles';

/**
 * Контейнер с отступами от края модалки
 *
 * @visibleName Modal.Body
 */
export class ModalBody extends React.Component {
  public static __KONTUR_REACT_UI__ = 'ModalBody';
  public static __MODAL_BODY__ = true;

  public render(): JSX.Element {
    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader }) => (
          <ZIndex
            priority={'ModalBody'}
            createStackingContext
            className={cn({
              [jsStyles.body()]: true,
              [jsStyles.bodyWithoutHeader()]: !hasHeader,
              [jsStyles.bodyAddPadding()]: additionalPadding,
            })}
          >
            {this.props.children}
          </ZIndex>
        )}
      </ModalContext.Consumer>
    );
  }
}
