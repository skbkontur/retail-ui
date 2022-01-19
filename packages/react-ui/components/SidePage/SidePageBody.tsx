import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { responsiveLayout } from '../ResponsiveLayout/decorator';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageBodyProps extends CommonProps {
  children?: React.ReactNode;
}
/**
 * Тело для сайдпейджа
 *
 * @visibleName SidePage.Body
 */
@responsiveLayout
export class SidePageBody extends React.Component<SidePageBodyProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageBody';

  public static contextType = SidePageContext;
  public context: SidePageContextType = this.context;
  private isMobileLayout!: boolean;

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <CommonWrapper {...this.props}>
              <div className={cx(styles.body(theme), { [styles.mobileBody()]: this.isMobileLayout })}>
                {this.props.children}
              </div>
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
