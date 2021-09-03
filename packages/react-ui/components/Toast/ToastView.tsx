import React from 'react';
import { func, shape, string } from 'prop-types';

import { CrossIcon } from '../../internal/icons/CrossIcon';
import { ZIndex } from '../../internal/ZIndex';
import { theme } from '../../lib/theming/decorators';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { styles } from './ToastView.styles';

export interface ToastViewProps extends CommonProps {
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

@theme
export class ToastView extends React.Component<ToastViewProps> {
  public static propTypes = {
    /**
     * Adds action handling and close icon for toast
     */
    action: shape({
      label: string.isRequired,
      handler: func.isRequired,
    }),
    /**
     * Toast content
     */
    children: string.isRequired,
    onClose: func,
  };

  private readonly theme!: Theme;

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  private renderMain = (props: CommonWrapperRestProps<ToastViewProps>) => {
    const { action, onClose, ...rest } = props;

    const link = action ? (
      <span data-tid="ToastView__action" className={styles.link(this.theme)} onClick={action.handler}>
        {action.label}
      </span>
    ) : null;

    const close = action ? (
      <span className={styles.closeWrapper(this.theme)}>
        <span data-tid="ToastView__close" className={styles.close(this.theme)} onClick={onClose}>
          <CrossIcon />
        </span>
      </span>
    ) : null;

    return (
      <ZIndex priority="Toast" className={styles.wrapper()}>
        <div data-tid="ToastView__root" {...rest} className={styles.root(this.theme)}>
          <span>{this.props.children}</span>
          {link}
          {close}
        </div>
      </ZIndex>
    );
  };
}
