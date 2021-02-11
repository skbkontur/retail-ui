import React from 'react';

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
      <CommonWrapper {...this.props}>
        <div className={jsStyles.bodyContainer()}>{this.props.children}</div>
      </CommonWrapper>
    );
  }
}
