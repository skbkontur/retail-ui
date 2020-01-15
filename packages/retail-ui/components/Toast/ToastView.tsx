import React from 'react';

import { CrossIcon } from '../internal/icons/CrossIcon';
import { ZIndex } from '../ZIndex';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './ToastView.styles';
import styles from './ToastView.module.less';

export interface ToastViewProps {
  /**
   * Toast content
   */
  children?: string;
  /**
   * Adds action handling and close icon for toast
   */
  action?: {
    label: string;
    handler: () => void;
  } | null;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export class ToastView extends React.Component<ToastViewProps> {
  private theme!: Theme;

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
      <span className={styles.closeWrapper}>
        <span className={cx(styles.close, jsStyles.close(this.theme))} onClick={onClose}>
          <CrossIcon />
        </span>
      </span>
    ) : null;

    return (
      <ZIndex priority="Toast" className={styles.wrapper}>
        <div className={cx(styles.root, jsStyles.root(this.theme))} {...rest}>
          <span>{children}</span>
          {link}
          {close}
        </div>
      </ZIndex>
    );
  }
}
