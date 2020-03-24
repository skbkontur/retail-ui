import React from 'react';

import { jsStyles } from './SidePage.styles';
import { SidePageContext, SidePageContextType } from './SidePageContext';

export interface SidePageBodyProps {
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

  public render(): JSX.Element {
    return <div className={jsStyles.body()}>{this.props.children}</div>;
  }
}
