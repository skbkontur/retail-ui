import React from 'react';

import { theme } from '../../lib/theming/decorators';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { ModalContext } from './ModalContext';
import { styles } from './Modal.styles';

export interface ModalBodyProps extends CommonProps {
  /**
   * убирает отступы
   */
  noPadding?: boolean;
}

/**
 * Контейнер с отступами от края модалки
 *
 * @visibleName Modal.Body
 */
@theme
export class ModalBody extends React.Component<ModalBodyProps> {
  public static __KONTUR_REACT_UI__ = 'ModalBody';
  public static __MODAL_BODY__ = true;

  private readonly theme!: Theme;

  public render() {
    const { noPadding } = this.props;
    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader }) => (
          <CommonWrapper {...this.props}>
            <ZIndex
              priority={'ModalBody'}
              createStackingContext
              className={cx({
                [styles.body(this.theme)]: true,
                [styles.bodyWithoutHeader(this.theme)]: !hasHeader,
                [styles.bodyAddPaddingForPanel(this.theme)]: additionalPadding,
                [styles.bodyWithoutPadding()]: noPadding,
              })}
            >
              {this.props.children}
            </ZIndex>
          </CommonWrapper>
        )}
      </ModalContext.Consumer>
    );
  }
}
