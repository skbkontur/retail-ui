import React from 'react';
import cn from 'classnames';

import { CrossIcon } from '../../internal/icons/CrossIcon';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles, jsTokenColors } from './Token.styles';

export type TokenColorName = keyof typeof jsTokenColors;

export interface TokenColors {
  idle: TokenColorName;
  active?: TokenColorName;
}

export interface TokenProps extends CommonProps {
  colors?: TokenColors;
  isActive?: boolean;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export class Token extends React.Component<TokenProps> {
  public static __KONTUR_REACT_UI__ = 'Token';

  private theme!: Theme;

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
    const validation = error ? 'error' : warning ? 'warning' : null;
    const disableClassNames = cn(jsTokenColors.defaultDisabled(theme), {
      [jsTokenColors.defaultDisabledWarning(theme)]: warning,
      [jsTokenColors.defaultDisabledError(theme)]: error,
    });

    let tokenClassName = disabled ? disableClassNames : jsTokenColors.defaultIdle(theme, validation);
    let activeTokenClassName = disabled ? disableClassNames : jsTokenColors.defaultActive(theme, validation);

    if (!disabled && colors) {
      tokenClassName = jsTokenColors[colors.idle](theme, validation);

      const activeClassName = colors.active ? colors.active : colors.idle;
      activeTokenClassName = jsTokenColors[activeClassName](theme, validation);
    }

    const tokenClassNames = cn(jsStyles.token(this.theme), tokenClassName, {
      [activeTokenClassName]: !!isActive,
      [jsStyles.disabled(theme)]: !!disabled,
    });

    return (
      <CommonWrapper {...this.props}>
        <div
          className={tokenClassNames}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <span className={jsStyles.text(this.theme)}>{children}</span>
          <span className={jsStyles.removeIcon(this.theme)} onClick={this.onRemoveClick}>
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
