import * as React from 'react';
import LayoutEvents from '../../lib/LayoutEvents';
import styles = require('./SidePage.less');

export default class SidePageBody extends React.Component {
  public componentDidUpdate() {
    LayoutEvents.emit();
  }

  public render(): JSX.Element {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}
