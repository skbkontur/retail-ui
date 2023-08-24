import React, { AriaAttributes } from 'react';

import { CrossIcon } from '../../internal/icons/CrossIcon';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { CloseButtonIcon } from '../../internal/CloseButtonIcon/CloseButtonIcon';
import { TokenInputContext, TokenInputContextType } from '../TokenInput/TokenInputContext';

import { styles, colorStyles, globalClasses } from './Token.styles';

export type TokenColorName = keyof typeof colorStyles;

export interface TokenColors {
  idle: TokenColorName;
  active?: TokenColorName;
}

export type TokenSize = 'small' | 'medium' | 'large';

export interface TokenProps extends CommonProps {
  colors?: TokenColors;
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
  /** Размер */
  size?: TokenSize;
  /**
   * Атрибут для указания id элемента(-ов), описывающих его
   */
  'aria-describedby'?: AriaAttributes['aria-describedby'];

  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

const getValidation = (error: TokenProps['error'], warning: TokenProps['warning']) => {
  if (error) {
    return 'error';
  } else if (warning) {
    return 'warning';
  }

  return null;
};

export const TokenDataTids = {
  root: 'Token__root',
  removeIcon: 'Token__removeIcon',
} as const;

@rootNode
export class Token<T> extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';

  public static contextType = TokenInputContext;
  public context: TokenInputContextType<T> = this.context;

  private getSizeClassName(size: TokenSize) {
    switch (size) {
      case 'large':
        return styles.tokenLarge(this.theme);
      case 'medium':
        return styles.tokenMedium(this.theme);
      case 'small':
      default:
        return styles.tokenSmall(this.theme);
    }
  }

  private theme!: Theme;
  private setRootNode!: TSetRootNode;

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
      size = this.context.size,
      children,
      isActive,
      colors = { idle: 'defaultIdle', active: 'defaultActive' },
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

    const validation = getValidation(error, warning);

    const icon = isTheme2022(theme) ? (
      <CloseButtonIcon side={16} color="inherit" colorHover="inherit" tabbable={false} />
    ) : (
      <CrossIcon />
    );

    let classNames = '';
    if (isTheme2022(theme)) {
      classNames = cx(
        styles.tokenDefaultIdle2022(theme),
        !isActive && !warning && !error && !disabled && styles.tokenDefaultIdleHovering2022(theme),
        isActive && styles.tokenDefaultActive2022(theme),
        warning && styles.tokenWarning2022(theme),
        error && styles.tokenError2022(theme),
        disabled && styles.tokenDisabled2022(theme),
      );
    } else {
      classNames = cx(
        colorStyles[colors.idle](theme, validation),
        !!isActive && colorStyles[colors.active || colors.idle](theme, validation),
        !!disabled && styles.disabled(theme),
        !!disabled && colorStyles.defaultDisabled(theme),
        !!disabled && warning && colorStyles.defaultDisabledWarning(theme),
        !!disabled && error && colorStyles.defaultDisabledError(theme),
      );
    }

    const tokenClassNames = cx(this.getSizeClassName(size ? size : 'small'), classNames, {
      [styles.token(theme)]: true,
    });

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          data-tid={TokenDataTids.root}
          className={tokenClassNames}
          aria-describedby={ariaDescribedby}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <span className={styles.text(this.theme)}>{children}</span>
          <span
            className={cx(styles.removeIcon(this.theme), globalClasses.removeIcon)}
            onClick={this.onRemoveClick}
            data-tid={TokenDataTids.removeIcon}
          >
            {icon}
          </span>
        </div>
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
