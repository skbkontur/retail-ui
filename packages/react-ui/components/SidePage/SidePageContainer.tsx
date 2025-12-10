import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './SidePage.styles.js';
import { SidePageContext } from './SidePageContext.js';

export type SidePageContainerProps = CommonProps;

export const SidePageContainerDataTids = {
  root: 'SidePageContainer__root',
} as const;

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
@withRenderEnvironment
@responsiveLayout
@rootNode
export class SidePageContainer extends React.Component<SidePageContainerProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';
  public static displayName = 'SidePageContainer';

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
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    return (
      <SidePageContext.Consumer>
        {({ hasHeader, hasFooter, hasPanel }) => (
          <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
            <div
              data-tid={SidePageContainerDataTids.root}
              className={this.cx({
                [this.styles.container(this.theme)]: true,
                [this.styles.containerWithoutHeader(this.theme)]: !hasHeader,
                [this.styles.containerWithoutFooter(this.theme)]: !hasFooter,
                [this.styles.containerWithPanel(this.theme)]: hasPanel,
                [this.styles.mobileContainer(this.theme)]: this.isMobileLayout,
                [this.styles.mobileContainerWithoutHeader(this.theme)]: this.isMobileLayout && !hasHeader,
              })}
            >
              {this.props.children}
            </div>
          </CommonWrapper>
        )}
      </SidePageContext.Consumer>
    );
  }
}
