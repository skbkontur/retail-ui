import * as React from 'react';
import * as PropTypes from 'prop-types';
import CROSS from '../internal/cross';
import ZIndex from '../ZIndex/ZIndex';
import styles from './ToastView.less';
import { Nullable } from '../../typings/utility-types';
import jsStyles from './ToastView.styles';
import { cx } from 'emotion';
import { ThemeConsumer } from '../internal/ThemeContext';
import { ITheme } from '../../lib/theming/Theme';

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

  private theme!: ITheme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { children, action, onClose, ...rest } = this.props;

    const link = action ? (
      <span className={cx(styles.link, jsStyles.link(this.theme))} onClick={action.handler}>
        {action.label}
      </span>
    ) : null;

    const close = action ? (
      <span className={cx(styles.close, jsStyles.close(this.theme))} onClick={onClose}>
        {CROSS}
      </span>
    ) : null;

    return (
      <ZIndex delta={1000} className={styles.wrapper}>
        <div className={cx(styles.root, jsStyles.root(this.theme))} {...rest}>
          <span>{children}</span>
          {link}
          {close}
        </div>
      </ZIndex>
    );
  }
}

export default ToastView;
