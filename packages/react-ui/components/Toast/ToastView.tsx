import React from 'react';
import { func, shape, string } from 'prop-types';

import { CrossIcon } from '../../internal/icons/CrossIcon';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './ToastView.styles';
import { toastDataTid } from './Toast';

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

@rootNode
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

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = (props: CommonWrapperRestProps<ToastViewProps>) => {
    const { action, onClose, ...rest } = props;

    const link = action ? (
      <span data-tid={toastDataTid.action} className={styles.link(this.theme)} onClick={action.handler}>
        {action.label}
      </span>
    ) : null;

    const close = action ? (
      <span className={styles.closeWrapper(this.theme)}>
        <span data-tid={toastDataTid.close} className={styles.close(this.theme)} onClick={onClose}>
          <CrossIcon />
        </span>
      </span>
    ) : null;

    return (
      <ZIndex priority="Toast" className={styles.wrapper(this.theme)}>
        <div data-tid={toastDataTid.toastView} {...rest} className={styles.root(this.theme)} ref={this.setRootNode}>
          <span>{this.props.children}</span>
          {link}
          {close}
        </div>
      </ZIndex>
    );
  };
}
