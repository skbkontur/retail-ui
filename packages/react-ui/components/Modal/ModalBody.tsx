import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import { ResizeDetector } from '../../internal/ResizeDetector/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { ModalContext } from './ModalContext.js';
import { getStyles } from './Modal.styles.js';
import { getModalBodyTheme } from './getModalBodyTheme.js';
import { ModalZIndexPriority } from './Modal.js';

export interface ModalBodyProps extends CommonProps {
  /** Убирает отступы. */
  noPadding?: boolean;
}

/**
 * ModalBody - контейнер с отступами от края модалки.
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

  public render() {
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
