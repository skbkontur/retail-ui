import React from 'react';

import styles from './SidePage.module.less';

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
export class SidePageContainer extends React.Component {
  public static __KONTUR_REACT_UI__ = 'SidePageContainer';

  public render(): JSX.Element {
    return <div className={styles.bodyContainer}>{this.props.children}</div>;
  }
}
