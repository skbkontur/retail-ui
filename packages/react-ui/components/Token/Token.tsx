import React from 'react';

import { CrossIcon } from '../../internal/icons/CrossIcon';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles, colorStyles, globalClasses } from './Token.styles';

export type TokenColorName = keyof typeof colorStyles;

export interface TokenColors {
  idle: TokenColorName;
  active?: TokenColorName;
}

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
  children?: React.ReactNode;

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

@rootNode
export class Token extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';

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
      children,
      isActive,
      colors,
      error,
      warning,
      disabled,
      onClick = emptyHandler,
      onDoubleClick = emptyHandler,
      onMouseEnter = emptyHandler,
      onMouseLeave = emptyHandler,
      onFocus = emptyHandler,
      onBlur = emptyHandler,
    } = this.props;

    const theme = this.theme;

    const validation = getValidation(error, warning);

    const disableClassNames = cx(colorStyles.defaultDisabled(theme), {
      [colorStyles.defaultDisabledWarning(theme)]: warning,
      [colorStyles.defaultDisabledError(theme)]: error,
    });

    let tokenClassName = disabled ? disableClassNames : colorStyles.defaultIdle(theme, validation);
    let activeTokenClassName = disabled ? disableClassNames : colorStyles.defaultActive(theme, validation);

    if (!disabled && colors) {
      tokenClassName = colorStyles[colors.idle](theme, validation);

      const activeClassName = colors.active ? colors.active : colors.idle;
      activeTokenClassName = colorStyles[activeClassName](theme, validation);
    }

    const tokenClassNames = cx(styles.token(this.theme), tokenClassName, {
      [activeTokenClassName]: !!isActive,
      [styles.disabled(theme)]: !!disabled,
    });

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          className={tokenClassNames}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <span className={styles.text(this.theme)}>{children}</span>
          <span className={cx(styles.removeIcon(this.theme), globalClasses.removeIcon)} onClick={this.onRemoveClick}>
            <CrossIcon />
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
