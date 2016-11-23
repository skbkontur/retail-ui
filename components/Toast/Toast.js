// @flow
import React, {Component} from 'react';
import CROSS from '../internal/cross';

import styles from './Toast.less';

type Props = {
  children?: string,
  action?: {
    label: string,
    handler: () => void
  },
  onClose?: () => void
}

class Toast extends Component {
  props: Props;

  render() {
    const {
      children,
      action,
      onClose,
      ...rest
    } = this.props;

    const link = action
      ? <span className={styles.link} onClick={action.handler}>
          {action.label}
        </span>
      : null;

    const close = action
      ? <span className={styles.close} onClick={onClose}>
          {CROSS}
        </span>
      : null;

    return (
      <div className={styles.wrapper}>
        <div className={styles.root} {...rest}>
          {children}
          {link}
          {close}
        </div>
      </div>
    );
  }
}

export default Toast;
