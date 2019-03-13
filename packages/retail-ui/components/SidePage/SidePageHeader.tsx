import * as React from 'react';
import classNames from 'classnames';
import { SVGCross } from '../internal/cross';
import Sticky from '../Sticky';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';

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
              {typeof this.props.children === 'function' ? this.props.children(fixed) : this.props.children}
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
            <SVGCross className={styles.closeIcon} />
          </a>
        )}
      </SidePageContext.Consumer>
    );
  }
}
