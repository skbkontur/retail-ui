import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './SidePage.styles';
import { SidePageContext } from './SidePageContext';

export type SidePageContainerProps = CommonProps;

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
@rootNode
export class SidePageContainer extends React.Component<SidePageContainerProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

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

  public renderMain() {
    return (
      <SidePageContext.Consumer>
        {({ hasHeader, hasFooter, hasPanel }) => (
          <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
            <div
              className={cx({
                [styles.container(this.theme)]: true,
                [styles.containerWithoutHeader(this.theme)]: !hasHeader,
                [styles.containerWithoutFooter(this.theme)]: !hasFooter,
                [styles.containerWithPanel(this.theme)]: hasPanel,
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
