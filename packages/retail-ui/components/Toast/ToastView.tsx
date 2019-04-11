import * as React from 'react';
import * as PropTypes from 'prop-types';
import CROSS from '../internal/cross';
import ZIndex from '../ZIndex/ZIndex';

import styles from './ToastView.less';
import { Nullable } from '../../typings/utility-types';

export interface ToastViewProps {
  children?: string;
  action?: Nullable<{
    label: string;
    handler: () => void;
  }>;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

class ToastView extends React.Component<ToastViewProps> {
  public static propTypes = {
    /**
     * Adds action handling and close icon for toast
     */
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    }),
    /**
     * Toast content
     */
    children: PropTypes.string.isRequired,
    onClose: PropTypes.func,
  };

  public render() {
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
