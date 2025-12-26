import React from 'react';
import type { Emotion } from '@emotion/css/types/create-instance';

import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

import { getStyles } from './SidePage.styles';
import type { SidePageContextType } from './SidePageContext';
import { SidePageContext } from './SidePageContext';

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
@withRenderEnvironment
@responsiveLayout
@rootNode
export class SidePageBody extends React.Component<SidePageBodyProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageBody';
  public static displayName = 'SidePageBody';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;
  private isMobileLayout!: boolean;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              <div
                data-tid={SidePageBodyDataTids.root}
                className={this.cx(this.styles.body(theme), { [this.styles.mobileBody()]: this.isMobileLayout })}
              >
                {this.props.children}
              </div>
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
