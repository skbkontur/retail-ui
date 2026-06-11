import type { Emotion } from '@emotion/css/create-instance';
import type { AriaAttributes } from 'react';
import React from 'react';

import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import { locale } from '../../lib/locale/decorators.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { isThemeGTE } from '../../lib/theming/ThemeHelpers.js';
import type { Nullable } from '../../typings/utility-types.js';
import { responsiveLayout } from '../ResponsiveLayout/decorator.js';
import type { ToastLocale } from './locale/index.js';
import { ToastLocaleHelper } from './locale/index.js';
import type { Action, ToastUse } from './Toast.js';
import { ToastDataTids } from './Toast.js';
import { getStyles } from './ToastView.styles.js';

export interface ToastViewProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  /** Отображает контент уведомления. */
  children?: React.ReactNode;
  /** Добавляет кнопку действия в тост. */
  action?: Nullable<Action>;
  /** Показывает кнопку закрытия рядом с текстом. */
  showCloseIcon?: boolean;
  /** Вызывается при закрытии тоста из разметки. */
  onClose?: () => void;
  /** Вызывается при наведении курсора на тост. */
  onMouseEnter?: () => void;
  /** Вызывается при уходе курсора с тоста. */
  onMouseLeave?: () => void;
  /** Выбирает стиль оформления: обычный или ошибка (`error`). */
  use?: ToastUse;
}

@responsiveLayout
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
  private isMobileLayout!: boolean;

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

    const isTheme6_1 = isThemeGTE(this.theme, '6.1');

    const toastCloseColors =
      use === 'error'
        ? {
            hover: this.theme.toastCloseHoverColorError,
            default: this.theme.toastCloseColorError,
          }
        : {
            hover: this.theme.toastCloseHoverColor,
            default: this.theme.toastCloseColor,
          };

    const toastActionColorsClassName =
      use === 'error' ? this.styles.toastActionErrorColor(this.theme) : this.styles.toastActionDefaultColor(this.theme);
    const toastActionClassNames = this.cx(
      this.styles.link(this.theme),
      isTheme6_1 && this.styles.link6_1(this.theme),

      toastActionColorsClassName,
    );

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

    const themeDependantProps = isTheme6_1
      ? {
          style: {
            height: '100%',
          },
          side: parseInt(this.theme.toastCloseBtnSide),
        }
      : { side: 40, size: parseInt(this.theme.toastCloseSize) };

    const close =
      action || showCloseIcon ? (
        <span className={this.cx(this.styles.closeWrapper(this.theme), isTheme6_1 && this.styles.closeWrapper6_1())}>
          <CloseButtonIcon
            aria-label={this.locale.closeButtonAriaLabel}
            data-tid={ToastDataTids.close}
            onClick={onClose}
            {...themeDependantProps}
            color={toastCloseColors.default}
            colorHover={toastCloseColors.hover}
            tabbable={false}
          />
        </span>
      ) : null;

    const rootClassName = this.cx(
      this.styles.root(this.theme),
      isTheme6_1 && this.styles.root6_1(),
      isTheme6_1 && this.isMobileLayout && this.styles.rootMobile(this.theme),
      this.styles[use ?? 'default'](this.theme),
    );

    const wrapperClassName = this.cx(this.styles.wrapper(this.theme), isTheme6_1 && this.styles.wrapper6_1(this.theme));

    return (
      <CommonWrapper {...this.props}>
        <ZIndex priority="Toast" className={wrapperClassName}>
          <div
            data-tid={ToastDataTids.toastView}
            className={rootClassName}
            ref={this.setRootNode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {isTheme6_1 ? (
              <span className={this.styles.content(this.theme)}>
                <span className={this.cx(this.isMobileLayout && this.styles.ellipsisContent())}>
                  {this.props.children}
                </span>
              </span>
            ) : (
              <span>{this.props.children}</span>
            )}
            {link}
            {close}
          </div>
        </ZIndex>
      </CommonWrapper>
    );
  };
}
