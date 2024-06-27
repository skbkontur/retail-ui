import React, { AriaAttributes } from 'react';

import { locale } from '../../lib/locale/decorators';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { SizeProp } from '../../lib/types/props';
import { reactGetTextContent } from '../../lib/reactGetTextContent';

import { styles } from './Token.styles';
import { TokenLocale, TokenLocaleHelper } from './locale';
import { TokenView } from './TokenView';

export type TokenSize = SizeProp;

export interface TokenProps extends Pick<AriaAttributes, 'aria-describedby'>, CommonProps {
  isActive?: boolean;
  /**
   * Состояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Состояние валидации при предупреждении.
   */
  warning?: boolean;
  disabled?: boolean;
  /**
   * Размер
   */
  size?: TokenSize;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export const TokenDataTids = {
  root: 'Token__root',
  removeIcon: 'Token__removeIcon',
} as const;

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
      styles.tokenDefaultIdle(theme),
      !isActive && !warning && !error && !disabled && styles.tokenDefaultIdleHovering(theme),
      isActive && styles.tokenDefaultActive(theme),
      warning && styles.tokenWarning(theme),
      error && styles.tokenError(theme),
      disabled && styles.tokenDisabled(theme),
    );

    const textholder = <span className={styles.text(this.theme)}>{children}</span>;

    const closeButton = (
      <span onClick={this.onRemoveClick} data-tid={TokenDataTids.removeIcon}>
        {icon}
      </span>
    );

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
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
