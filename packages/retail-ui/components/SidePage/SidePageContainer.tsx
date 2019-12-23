import * as React from 'react';

import styles from './SidePage.module.less';

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
export default class SidePageContainer extends React.Component {
  public render(): JSX.Element {
    return <div className={styles.bodyContainer}>{this.props.children}</div>;
  }
}
