import React from 'react';

import { jsStyles } from './SidePage.styles';

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
export class SidePageContainer extends React.Component {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';

  public render(): JSX.Element {
    return (
      <div className={jsStyles.bodyContainer()}>
        {this.props.children}
      </div>
    );
  }
}
