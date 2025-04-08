import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageBodyProps extends CommonProps {
  children?: React.ReactNode;
}

export const SidePageBodyDataTids = {
  root: 'SidePageBody__root',
} as const;
/**
 * Тело для сайдпейджа
 *
 * @visibleName SidePage.Body
 */
@responsiveLayout
@rootNode
export class SidePageBody extends React.Component<SidePageBodyProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageBody';
  public static displayName = 'SidePageBody';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private isMobileLayout!: boolean;
  private setRootNode!: TSetRootNode;

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                return (
                  <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
                    <div
                      data-tid={SidePageBodyDataTids.root}
                      className={this.emotion.cx(this.styles.body(theme), {
                        [this.styles.mobileBody()]: this.isMobileLayout,
                      })}
                    >
                      {this.props.children}
                    </div>
                  </CommonWrapper>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }
}
