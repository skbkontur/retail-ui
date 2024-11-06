import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Theme } from '../../lib/theming/Theme';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { SidePageContext } from './SidePageContext';
import { getStyles } from './SidePage.styles';

export type SidePageContainerProps = CommonProps;

export const SidePageContainerDataTids = {
  root: 'SidePageContainer__root',
} as const;

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
@responsiveLayout
@rootNode
export class SidePageContainer extends React.Component<SidePageContainerProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';
  public static displayName = 'SidePageContainer';

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
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  public renderMain() {
    const styles = this.styles;

    return (
      <SidePageContext.Consumer>
        {({ hasHeader, hasFooter, hasPanel }) => (
          <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
            <div
              data-tid={SidePageContainerDataTids.root}
              className={this.emotion.cx({
                [styles.container(this.theme)]: true,
                [styles.containerWithoutHeader(this.theme)]: !hasHeader,
                [styles.containerWithoutFooter(this.theme)]: !hasFooter,
                [styles.containerWithPanel(this.theme)]: hasPanel,
                [styles.mobileContainer(this.theme)]: this.isMobileLayout,
                [styles.mobileContainerWithoutHeader(this.theme)]: this.isMobileLayout && !hasHeader,
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
