
import * as React from 'react';
import Item from './Item';

import styles from './TopBar.less';

class ButtonItem extends React.Component<{
  active?: boolean,
  children?: React.Element<*> | string,
  className?: string,
  icon?: string,
  iconOnly?: boolean,
  minWidth?: string | number,
  onClick?: () => void,
  use?: 'danger' | 'pay'
}> {
  render() {
    const { onClick, children } = this.props;
    return (
      <Item {...this.props} className={styles.button} _onClick={onClick}>
        {children}
      </Item>
    );
  }
}

export default ButtonItem;
