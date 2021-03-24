import React from 'react';
import cn from 'classnames';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageBodyProps extends CommonProps {
  children?: React.ReactNode;
}
/**
 * Тело для сайдпейджа
 *
 * @visibleName SidePage.Body
 */
export class SidePageBody extends React.Component<SidePageBodyProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageBody';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;

  private theme!: Theme;

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain() {
    return (
      <SidePageContext.Consumer>
        {({ hasHeader, hasFooter }) => (
          <CommonWrapper {...this.props}>
            <div
              className={cn({
                [jsStyles.body()]: true,
                [jsStyles.bodyWithoutHeader(this.theme)]: !hasHeader,
                [jsStyles.bodyWithoutFooter(this.theme)]: !hasFooter,
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
