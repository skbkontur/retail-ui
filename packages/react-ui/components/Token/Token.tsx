import React from 'react';
import warningOutput from 'warning';
import cn from 'classnames';

import { CrossIcon } from '../internal/icons/CrossIcon';
import { emptyHandler } from '../../lib/utils';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles, jsTokenColors } from './Token.styles';

const deprecatedColorNames: { [key: string]: TokenColorName } = {
  'i-default': 'defaultIdle',
  'a-default': 'defaultActive',
  'l-gray': 'grayIdle',
  'd-gray': 'grayActive',
  'l-blue': 'blueIdle',
  'd-blue': 'blueActive',
  'l-green': 'greenIdle',
  'd-green': 'greenActive',
  'l-yellow': 'yellowIdle',
  'd-yellow': 'yellowActive',
  'l-red': 'redIdle',
  'd-red': 'redActive',
};

export type TokenColorName = keyof typeof jsTokenColors;

export interface TokenColors {
  idle: TokenColorName;
  active?: TokenColorName;
}

export interface TokenProps {
  colors?: TokenColors;
  isActive?: boolean;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
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
      onMouseEnter = emptyHandler,
      onMouseLeave = emptyHandler,
      onFocus = emptyHandler,
      onBlur = emptyHandler,
    } = this.props;

    if (process.env.NODE_ENV !== 'production' && colors) {
      warningOutput(
        !deprecatedColorNames[colors.idle],
        `Color name '${colors.idle}' has been deprecated, use '${deprecatedColorNames[colors.idle]}' instead`,
      );

      if (colors.active) {
        warningOutput(
          !deprecatedColorNames[colors.active],
          `Color name '${colors.active}' has been deprecated, use '${deprecatedColorNames[colors.active]}' instead`,
        );
      }
    }

    const theme = this.theme;
    const validation = error ? 'error' : warning ? 'warning' : null;
    const disableClassNames = cn(jsTokenColors.defaultDisabled(theme), {
      [jsTokenColors.defaultDisabledWarning(theme)]: warning,
      [jsTokenColors.defaultDisabledError(theme)]: error,
    });

    let tokenClassName = disabled ? disableClassNames : jsTokenColors.defaultIdle(theme, validation);
    let activeTokenClassName = disabled ? disableClassNames : jsTokenColors.defaultActive(theme, validation);

    if (!disabled && colors) {
      const idleClassName = deprecatedColorNames[colors.idle] || colors.idle;
      tokenClassName = jsTokenColors[idleClassName](theme, validation);

      const activeClassName = colors.active ? deprecatedColorNames[colors.active] || colors.active : idleClassName;
      activeTokenClassName = jsTokenColors[activeClassName](theme, validation);
    }

    const tokenClassNames = cn(jsStyles.token(), tokenClassName, {
      [activeTokenClassName]: !!isActive,
      [jsStyles.disabled(theme)]: !!disabled,
    });

    return (
      <div
        className={tokenClassNames}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span className={jsStyles.text()}>{children}</span>
        <span className={jsStyles.removeIcon()} onClick={this.onRemoveClick}>
          <CrossIcon />
        </span>
      </div>
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
