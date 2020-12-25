import React from 'react';
import cn from 'classnames';

import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

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
    const [{ className, ...commonProps }] = extractCommonProps(this.props);
    const wrapperProps = {
      ...commonProps,
      className: cn(className, jsStyles.bodyContainer()),
    };
    return <div {...wrapperProps}>{this.props.children}</div>;
  }
}
