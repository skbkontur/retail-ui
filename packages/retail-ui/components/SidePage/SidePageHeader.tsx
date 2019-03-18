import * as React from 'react';
import classNames from 'classnames';

import Sticky from '../Sticky';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';
import { isFunction } from 'retail-ui/lib/utils';

export interface SidePageHeaderProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export default class SidePageHeader extends React.Component<SidePageHeaderProps> {
  public render(): JSX.Element {
    return (
      <Sticky side="top">
        {fixed => (
          <div className={classNames(styles.header, fixed && styles.fixed)}>
            {this.renderClose()}
            <div className={classNames(styles.title, fixed && styles.fixed)}>
              {isFunction(this.props.children) ? this.props.children(fixed) : this.props.children}
            </div>
          </div>
        )}
      </Sticky>
    );
  }

  public renderClose() {
    return (
      <SidePageContext.Consumer>
        {({ requestClose }) => (
          <a href="javascript:" className={styles.close} onClick={requestClose}>
            <span>×</span>
          </a>
        )}
      </SidePageContext.Consumer>
    );
  }
}
