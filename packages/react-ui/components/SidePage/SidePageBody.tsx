import React from 'react';
import cn from 'classnames';

import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

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

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render() {
    const [{ className, ...commonProps }] = extractCommonProps(this.props);
    const wrapperProps = {
      ...commonProps,
      className: cn(className, jsStyles.body()),
    };
    return <div {...wrapperProps}>{this.props.children}</div>;
  }
}
