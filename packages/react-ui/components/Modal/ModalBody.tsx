import React, { type JSX } from 'react';
import type { Emotion } from '@emotion/css/types/create-instance';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import { ZIndex } from '../../internal/ZIndex';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { ResizeDetector } from '../../internal/ResizeDetector';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

import { ModalContext } from './ModalContext';
import { getStyles } from './Modal.styles';
import { getModalBodyTheme } from './getModalBodyTheme';
import { ModalZIndexPriority } from './Modal';

export interface ModalBodyProps extends CommonProps {
  /** Убирает отступы. */
  noPadding?: boolean;
}

/**
 * Контейнер с отступами для содержимого модального окна.
 *
 * @visibleName Modal.Body
 */
@withRenderEnvironment
@responsiveLayout
@rootNode
export class ModalBody extends React.Component<ModalBodyProps> {
  public static __KONTUR_REACT_UI__ = 'ModalBody';
  public static displayName = 'ModalBody';
  public static __MODAL_BODY__ = true;

  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private isMobileLayout!: boolean;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = getModalBodyTheme(theme);
          return <ThemeContext.Provider value={this.theme}>{this.renderMain()}</ThemeContext.Provider>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private handleResize = () => {
    LayoutEvents.emit();
  };

  public renderMain(): JSX.Element {
    const { noPadding } = this.props;
    return (
      <ModalContext.Consumer>
        {({ additionalPadding, hasHeader }) => (
          <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
            <ZIndex
              priority={ModalZIndexPriority.Content}
              className={this.cx({
                [this.styles.body(this.theme)]: true,
                [this.styles.mobileBody(this.theme)]: this.isMobileLayout,
                [this.styles.bodyWithoutHeader(this.theme)]: !hasHeader,
                [this.styles.bodyAddPaddingForPanel(this.theme)]: additionalPadding,
                [this.styles.mobileBodyAddPaddingForPanel(this.theme)]: additionalPadding && this.isMobileLayout,
                [this.styles.mobileBodyWithoutHeader(this.theme)]: !hasHeader && this.isMobileLayout,
                [this.styles.bodyWithoutPadding()]: noPadding,
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
