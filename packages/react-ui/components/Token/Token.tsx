import type { Emotion } from '@emotion/css/create-instance';
import type { AriaAttributes } from 'react';
import React from 'react';

import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes.js';
import { locale } from '../../lib/locale/decorators.js';
import { reactGetTextContent } from '../../lib/reactGetTextContent.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { emptyHandler } from '../../lib/utils.js';
import type { TokenLocale } from './locale/index.js';
import { TokenLocaleHelper } from './locale/index.js';
import { getStyles } from './Token.styles.js';
import { TokenView } from './TokenView.js';

export type TokenSize = SizeProp;

export interface TokenProps extends Pick<AriaAttributes, 'aria-describedby'>, CommonProps {
  /** Делает токен активным. */
  isActive?: boolean;
  /** Меняет визуальное отображение токена на состояние «ошибка». Может быть полезен при разработке собственной валидации, если вы не используете пакет [React UI Validations](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_displaying-getting-started--docs). */
  error?: boolean;
  /** Меняет визуальное отображение токена на состояние «предупреждение». Может быть полезен при разработке собственной валидации, если вы не используете пакет [React UI Validations](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_displaying-getting-started--docs). */
  warning?: boolean;
  /** Блокирует токен. */
  disabled?: boolean;
  /** Размер токена. */
  size?: TokenSize;
  /** Задаёт функцию, которая вызывается при клике на токен. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Задаёт функцию, которая вызывается при двойном клике на токен. */
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Задаёт функцию, которая вызывается, когда токен удаляется. */
  onRemove?: React.MouseEventHandler<HTMLElement>;
  /** Задаёт функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** Задаёт функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** Задаёт функцию, которая вызывается, когда токен получает фокус. */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  /** Задаёт функцию, которая вызывается, когда токен теряет фокус. */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const TokenDataTids = {
  root: 'Token__root',
  removeIcon: 'Token__removeIcon',
} as const;

/** Токены — это значение заданного формата внутри поля ввода. Например, номера телефонов, почты, ИНН, СНИЛС, статусы, группы и другие.
 *
 * Используется ак значение внутри [TokenInput](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_input-data-tokeninput-tokeninput--docs).
 */
@withRenderEnvironment
@rootNode
@locale('Token', TokenLocaleHelper)
export class Token extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';
  public static displayName = 'Token';

  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private readonly locale!: TokenLocale;

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

  private renderMain() {
    const {
      size,
      children,
      isActive,
      error,
      warning,
      disabled,
      'aria-describedby': ariaDescribedby,
      onClick = emptyHandler,
      onDoubleClick = emptyHandler,
      onMouseEnter = emptyHandler,
      onMouseLeave = emptyHandler,
      onFocus = emptyHandler,
      onBlur = emptyHandler,
    } = this.props;

    const theme = this.theme;

    const removeButtonAriaLabel = this.locale.removeButtonAriaLabel + ' ' + reactGetTextContent(children);

    const icon = (
      <CloseButtonIcon
        side={16}
        color="inherit"
        colorHover="inherit"
        aria-label={removeButtonAriaLabel}
        tabbable={false}
      />
    );

    const classNames = this.cx(
      this.styles.tokenIdle(theme),
      !isActive && !warning && !error && !disabled && this.styles.tokenHover(theme),
      isActive && this.styles.tokenActive(theme),
      warning && this.styles.tokenWarning(theme),
      error && this.styles.tokenError(theme),
      disabled && this.styles.tokenDisabled(theme),
    );

    const textholder = <span className={this.styles.text()}>{children}</span>;

    const closeButton = (
      <span onClick={this.onRemoveClick} data-tid={TokenDataTids.removeIcon}>
        {icon}
      </span>
    );

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props} {...getVisualStateDataAttributes({ disabled })}>
        <TokenView
          className={classNames}
          size={size}
          closeButton={closeButton}
          data-tid={TokenDataTids.root}
          aria-describedby={ariaDescribedby}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {textholder}
        </TokenView>
      </CommonWrapper>
    );
  }

  private onRemoveClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { disabled, onRemove = emptyHandler } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    onRemove(event);
  };
}
