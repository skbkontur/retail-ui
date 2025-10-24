import type { AriaAttributes } from 'react';
import React from 'react';

import { locale } from '../../lib/locale/decorators';
import type { Nullable } from '../../typings/utility-types';
import { ZIndex } from '../../internal/ZIndex';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './ToastView.styles';
import type { Action, ToastUse } from './Toast';
import { ToastDataTids } from './Toast';
import type { ToastLocale } from './locale';
import { ToastLocaleHelper } from './locale';

export interface ToastViewProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  /** Задает контент тоста. */
  children?: React.ReactNode;
  /** Добавляет возможность действия и кнопку закрытия у тоста. */
  action?: Nullable<Action>;
  showCloseIcon?: boolean;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /**
   * Задаёт стили для отображения тоста в зависимости от назначения.
   **/
  use?: ToastUse;
}

@rootNode
@locale('Toast', ToastLocaleHelper)
export class ToastView extends React.Component<ToastViewProps> {
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
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
    const { action, showCloseIcon, onClose, onMouseEnter, onMouseLeave, use } = this.props;

    const toastCloseColors =
      use === 'error'
        ? { hover: this.theme.toastCloseHoverColorError, default: this.theme.toastCloseColorError }
        : { hover: this.theme.toastCloseHoverColor, default: this.theme.toastCloseColor };

    const toastActionColorsClassName =
      use === 'error' ? styles.toastActionErrorColor(this.theme) : styles.toastActionDefaultColor(this.theme);
    const toastActionClassNames = cx(styles.link(this.theme), toastActionColorsClassName);

    const link = action ? (
      <button
        aria-label={action['aria-label']}
        data-tid={ToastDataTids.action}
        className={toastActionClassNames}
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
            color={toastCloseColors.default}
            colorHover={toastCloseColors.hover}
            tabbable={false}
          />
        </span>
      ) : null;

    const rootClassName = cx(styles.root(this.theme), styles[use ?? 'default'](this.theme));

    return (
      <CommonWrapper {...this.props}>
        <ZIndex priority="Toast" className={styles.wrapper(this.theme)}>
          <div
            data-tid={ToastDataTids.toastView}
            className={rootClassName}
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
