import React from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './SidePage.styles';

export type SidePageContainerProps = CommonProps;

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
export class SidePageContainer extends React.Component<SidePageContainerProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            <CommonWrapper {...this.props}>
              <div className={jsStyles.bodyContainer(theme)}>{this.props.children}</div>
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
