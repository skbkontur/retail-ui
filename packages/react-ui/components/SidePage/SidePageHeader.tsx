import * as React from 'react';
import classNames from 'classnames';

import Sticky from '../Sticky';

import styles = require('./SidePage.less');
import { SidePageContext } from './SidePageContext';

export interface SidePageHeaderProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export default class SidePageHeader extends React.Component<
  SidePageHeaderProps
> {
  public render() {
    return (
      <tr>
        <td className={styles.layoutItem}>
          <Sticky side="top">
            {fixed => (
              <div className={classNames(styles.header, fixed && styles.fixed)}>
                {this.renderClose()}
                <div
                  className={classNames(styles.title, fixed && styles.fixed)}
                >
                  {typeof this.props.children === 'function'
                    ? this.props.children(fixed)
                    : this.props.children}
                </div>
              </div>
            )}
          </Sticky>
        </td>
      </tr>
    );
  }

  public renderClose() {
    return (
      <SidePageContext.Consumer>
        {requestClose => (
          <a href="javascript:" className={styles.close} onClick={requestClose}>
            <span>×</span>
          </a>
        )}
      </SidePageContext.Consumer>
    );
  }
}
