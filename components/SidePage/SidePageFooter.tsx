import * as React from 'react';
import classNames from 'classnames';

import Sticky from '../Sticky';

import styles = require('./SidePage.less');

export interface SidePageFooterProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);

  /**
   * Включает серый цвет в футере
   */
  panel?: boolean;
}

/**
 * Футер модального окна.
 */
export default class SidePageFooter extends React.Component<
  SidePageFooterProps
> {
  public render() {
    return (
      <tr>
        <td className={styles.layoutItem}>
          <Sticky side="bottom">
            {fixed => {
              const names = classNames({
                [styles.footer]: true,
                [styles.panel]: this.props.panel,
                [styles.fixed]: fixed
              });

              return (
                <div className={names}>
                  {typeof this.props.children === 'function'
                    ? this.props.children(fixed)
                    : this.props.children}
                </div>
              );
            }}
          </Sticky>
        </td>
      </tr>
    );
  }
}
