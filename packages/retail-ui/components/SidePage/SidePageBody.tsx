import * as React from 'react';
import styles = require('./SidePage.less');
import { SidePageContextType, withContext } from './SidePageContext';

export interface SidePageBodyProps {
  children?: React.ReactNode;
  context?: SidePageContextType;
}

export class SidePageBody extends React.Component<SidePageBodyProps> {
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

export const SidePageBodyWithContext = withContext<SidePageBodyProps>(SidePageBody);

export default SidePageBodyWithContext;
