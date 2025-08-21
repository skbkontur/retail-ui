import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { cx } from '../../lib/theming/Emotion';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';

import { styles } from './SidePage.styles';
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

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              <div
                data-tid={SidePageBodyDataTids.root}
                className={cx(styles.body(theme), { [styles.mobileBody()]: this.isMobileLayout })}
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
