import * as React from 'react';
import styles from './SidePage.module.less';
import { SidePageContextType, SidePageContext } from './SidePageContext';
import { withContext } from '../../lib/utils';

export interface SidePageBodyProps {
  children?: React.ReactNode;
  context?: SidePageContextType;
}

export class SidePageBody extends React.Component<SidePageBodyProps> {
  public static __KONTUR_REACT_UI__ = 'SidePageBody';

  public componentDidUpdate() {
    const { context } = this.props;
    if (context) {
      context.updateLayout();
    }
  }

  public render(): JSX.Element {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}

export const SidePageBodyWithContext = withContext(SidePageContext.Consumer)(SidePageBody);

export default SidePageBodyWithContext;
