import type { AriaAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { locale } from '../../lib/locale/decorators.js';
import type { Nullable } from '../../typings/utility-types.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './ToastView.styles.js';
import type { Action, ToastUse } from './Toast.js';
import { ToastDataTids } from './Toast.js';
import type { ToastLocale } from './locale/index.js';
import { ToastLocaleHelper } from './locale/index.js';

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

@withRenderEnvironment
@rootNode
@locale('Toast', ToastLocaleHelper)
export class ToastView extends React.Component<ToastViewProps> {
  private styles!: ReturnType<typeof getStyles>;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private readonly locale!: ToastLocale;

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
      use === 'error' ? this.styles.toastActionErrorColor(this.theme) : this.styles.toastActionDefaultColor(this.theme);
    const toastActionClassNames = this.cx(this.styles.link(this.theme), toastActionColorsClassName);

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
        <span className={this.styles.closeWrapper(this.theme)}>
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

    const rootClassName = this.cx(this.styles.root(this.theme), this.styles[use ?? 'default'](this.theme));

    return (
      <CommonWrapper {...this.props}>
        <ZIndex priority="Toast" className={this.styles.wrapper(this.theme)}>
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
