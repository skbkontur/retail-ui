import type { AriaAttributes } from 'react';
import React from 'react';

import { locale } from '../../lib/locale/decorators';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import type { SizeProp } from '../../lib/types/props';
import { reactGetTextContent } from '../../lib/reactGetTextContent';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';

import { styles } from './Token.styles';
import type { TokenLocale } from './locale';
import { TokenLocaleHelper } from './locale';
import { TokenView } from './TokenView';

export type TokenSize = SizeProp;

export interface TokenProps extends Pick<AriaAttributes, 'aria-describedby'>, CommonProps {
  /** Устанавливает, является ли токен активным. */
  isActive?: boolean;
  /** Переводит контрол в состояние валидации "ошибка" */
  error?: boolean;
  /** Переводит контрол в состояние валидации "предупреждение". */
  warning?: boolean;
  /** Делает компонент недоступным. */
  disabled?: boolean;
  /** Задает размер контрола. */
  size?: TokenSize;
  /** Задает функцию, которая вызывается, когда на токен кликнули. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Задает функцию, которая вызывается, когда на токен кликнули дважды. */
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Задает функцию, которая вызывается, когда токен удаляется. */
  onRemove?: React.MouseEventHandler<HTMLElement>;
  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** Задает функцию, которая вызывается, когда токен получает фокус. */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  /** Задает функцию, которая вызывается, когда токен теряет фокус. */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const TokenDataTids = {
  root: 'Token__root',
  removeIcon: 'Token__removeIcon',
} as const;

/**
 * Однородный элемент — `Token`.
 *
 * Используется в компоненте поле с токенами TokenInput.
 */
@rootNode
@locale('Token', TokenLocaleHelper)
export class Token extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';
  public static displayName = 'Token';

  private theme!: Theme;
  private setRootNode!: TSetRootNode;
  private readonly locale!: TokenLocale;

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

    const classNames = cx(
      styles.tokenIdle(theme),
      !isActive && !warning && !error && !disabled && styles.tokenHover(theme),
      isActive && styles.tokenActive(theme),
      warning && styles.tokenWarning(theme),
      error && styles.tokenError(theme),
      disabled && styles.tokenDisabled(theme),
    );

    const textholder = <span className={styles.text()}>{children}</span>;

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
