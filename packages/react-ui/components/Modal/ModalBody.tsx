import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { ResizeDetector } from '../../internal/ResizeDetector';

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
@responsiveLayout
export class ModalBody extends React.Component<ModalBodyProps> {
  public static __KONTUR_REACT_UI__ = 'ModalBody';
  public static __MODAL_BODY__ = true;

  private theme!: Theme;
  private isMobileLayout!: boolean;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private handleResize = (event: UIEvent) => {
    LayoutEvents.emit();
  };

  public renderMain(): JSX.Element {
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
                [styles.mobileBody(this.theme)]: this.isMobileLayout,
                [styles.bodyWithoutHeader(this.theme)]: !hasHeader,
                [styles.mobileBodyWithoutHeader(this.theme)]: !hasHeader && this.isMobileLayout,
                [styles.bodyAddPaddingForPanel(this.theme)]: additionalPadding,
                [styles.mobileBodyAddPaddingForPanel(this.theme)]: additionalPadding && this.isMobileLayout,
                [styles.bodyWithoutPadding()]: noPadding,
              })}
            >
              {this.isMobileLayout ? (
                <ResizeDetector onResize={this.handleResize}>{this.props.children}</ResizeDetector>
              ) : (
                this.props.children
              )}
            </ZIndex>
          </CommonWrapper>
        )}
      </ModalContext.Consumer>
    );
  }
}
