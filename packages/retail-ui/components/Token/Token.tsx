import React from 'react';
import warningOutput from 'warning';
import styles from './Token.less';
import TokenRemoveIcon from './TokenRemoveIcon';
import { emptyHandler } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import jsStyles, { jsTokenColors } from './Token.styles';
import { ThemeConsumer } from '../internal/ThemeContext';
import { ITheme } from '../../lib/theming/Theme';

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

export interface TokenActions {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<SVGElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export interface TokenProps {
  colors?: TokenColors;
  isActive?: boolean;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
}

export default class Token extends React.Component<TokenProps & TokenActions> {
  private theme!: ITheme;

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

    let tokenClassName = disabled ? jsTokenColors.defaultDisabled(theme) : jsTokenColors.defaultIdle(theme);
    let activeTokenClassName = disabled ? jsTokenColors.defaultDisabled(theme) : jsTokenColors.defaultActive(theme);

    if (!disabled && colors) {
      const idleClassName = deprecatedColorNames[colors.idle] || colors.idle;
      tokenClassName = jsTokenColors[idleClassName](theme);

      const activeClassName = colors.active ? deprecatedColorNames[colors.active] || colors.active : idleClassName;
      activeTokenClassName = jsTokenColors[activeClassName](theme);
    }

    const tokenClassNames = cx(styles.token, tokenClassName, {
      [styles.disabled]: !!disabled,
      [activeTokenClassName]: !!isActive,
      [jsStyles.warning(theme)]: !!warning,
      [jsStyles.error(theme)]: !!error,
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
        <span className={styles.text}>{children}</span>
        <TokenRemoveIcon className={styles.removeIcon} onClick={this.onRemoveClick} />
      </div>
    );
  }

  private onRemoveClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const { disabled, onRemove = emptyHandler } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    onRemove(event);
  };
}
