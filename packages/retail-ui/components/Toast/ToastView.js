
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CROSS from '../internal/cross';
import ZIndex from '../ZIndex/ZIndex';

import styles from './Toast.less';

type Props = {
  children?: string,
  action?: {
    label: string,
    handler: () => void
  },
  onClose?: () => void
};

class ToastView extends Component<Props> {
  static propTypes = {
    /**
     * Adds action handling and close icon fot tost
     */
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired
    }),
    /**
     * Tost content
     */
    children: PropTypes.string.isRequired,
    onClose: PropTypes.func
  };

  render() {
    const { children, action, onClose, ...rest } = this.props;

    const link = action ? (
      <span className={styles.link} onClick={action.handler}>
        {action.label}
      </span>
    ) : null;

    const close = action ? (
      <span className={styles.close} onClick={onClose}>
        {CROSS}
      </span>
    ) : null;

    return (
      <ZIndex delta={1000} className={styles.wrapper}>
        <div className={styles.root} {...rest}>
          {children}
          {link}
          {close}
        </div>
      </ZIndex>
    );
  }
}

export default ToastView;
