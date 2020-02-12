import React from 'react';

import styles from './SidePage.module.less';
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
  public context!: SidePageContextType;

  public componentDidUpdate() {
    this.context.updateLayout();
  }

  public render(): JSX.Element {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}
