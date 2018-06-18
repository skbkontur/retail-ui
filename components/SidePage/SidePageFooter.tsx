import * as React from 'react';
import classNames from 'classnames';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';

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
          <SidePageContext.Consumer>
            {({ width }) => (
              <div
                style={{
                  position: 'fixed',
                  bottom: 0,
                  width: this.getWidth(width)
                }}
              >
                <div
                  className={classNames(styles.footer, {
                    [styles.panel]: this.props.panel
                  })}
                >
                  {this.props.children}
                </div>
              </div>
            )}
          </SidePageContext.Consumer>
        </td>
      </tr>
    );
  }

  private getWidth(width: number | string | undefined): number {
    if (typeof width === 'string') {
      return 0;
    }
    return width || 0;
  }
}
