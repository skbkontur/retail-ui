import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { ResizeDetector } from '../../internal/ResizeDetector';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ModalContext } from './ModalContext';
import { getStyles } from './Modal.styles';
import { getModalBodyTheme } from './getModalBodyTheme';

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
@rootNode
export class ModalBody extends React.Component<ModalBodyProps> {
  public static __KONTUR_REACT_UI__ = 'ModalBody';
  public static displayName = 'ModalBody';
  public static __MODAL_BODY__ = true;

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private isMobileLayout!: boolean;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = getModalBodyTheme(theme);
                return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private handleResize = () => {
    LayoutEvents.emit();
  };

  public renderMain(): JSX.Element {
    const { noPadding } = this.props;
    const styles = this.styles;

    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader }) => (
          <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
            <ZIndex
              className={this.emotion.cx({
                [styles.body(this.theme)]: true,
                [styles.mobileBody(this.theme)]: this.isMobileLayout,
                [styles.bodyWithoutHeader(this.theme)]: !hasHeader,
                [styles.mobileBodyWithoutHeader()]: !hasHeader && this.isMobileLayout,
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
