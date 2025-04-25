import type { AriaAttributes } from 'react';
import React from 'react';
import { func, shape, string } from 'prop-types';

import { locale } from '../../lib/locale/decorators';
import type { Nullable } from '../../typings/utility-types';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';

import { styles } from './ToastView.styles';
import type { Action } from './Toast';
import { ToastDataTids } from './Toast';
import type { ToastLocale } from './locale';
import { ToastLocaleHelper } from './locale';

export interface ToastViewProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  /** Задает контент тоста. */
  children?: string;
  /** Добавляет возможность действия и кнопку закрытия у тоста. */
  action?: Nullable<Action>;
  showCloseIcon?: boolean;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

@rootNode
@locale('Toast', ToastLocaleHelper)
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
  private readonly locale!: ToastLocale;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = () => {
    const { action, showCloseIcon, onClose, onMouseEnter, onMouseLeave } = this.props;

    const link = action ? (
      <button
        aria-label={action['aria-label']}
        data-tid={ToastDataTids.action}
        className={styles.link(this.theme)}
        onClick={action.handler}
      >
        {action.label}
      </button>
    ) : null;

    const close =
      action || showCloseIcon ? (
        <span className={styles.closeWrapper(this.theme)}>
          <CloseButtonIcon
            aria-label={this.locale.closeButtonAriaLabel}
            data-tid={ToastDataTids.close}
            onClick={onClose}
            size={parseInt(this.theme.toastCloseSize)}
            side={40}
            color={this.theme.toastCloseColor}
            colorHover={this.theme.toastCloseHoverColor}
            tabbable={false}
          />
        </span>
      ) : null;

    return (
      <CommonWrapper {...this.props}>
        <ZIndex priority="Toast" className={styles.wrapper(this.theme)}>
          <div
            data-tid={ToastDataTids.toastView}
            className={styles.root(this.theme)}
            ref={this.setRootNode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <span>{this.props.children}</span>
            {link}
            {close}
          </div>
        </ZIndex>
      </CommonWrapper>
    );
  };
}
