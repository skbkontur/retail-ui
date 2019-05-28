import React, { Component } from 'react';
import warningOutput from 'warning';
import styles from './Token.less';
import TokenRemoveIcon from './TokenRemoveIcon';
import { emptyHandler } from '../../lib/utils';
import { cx as cn } from '../../lib/theming/Emotion';
import jsStyles from './Token.styles';
import jsTokenColors from './Colors.styles';
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
}

export default class Token extends Component<TokenProps & TokenActions> {
  public static defaultProps = {
    onClick: emptyHandler,
    onRemove: emptyHandler,
    onMouseEnter: emptyHandler,
    onMouseLeave: emptyHandler,
    onFocus: emptyHandler,
    onBlur: emptyHandler,
  };

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
      onClick,
      onRemove,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
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

    let tokenClassName = jsTokenColors.defaultIdle(this.theme);
    let activeTokenClassName = jsTokenColors.defaultActive(this.theme);
    if (colors) {
      const idleClassName = deprecatedColorNames[colors.idle] || colors.idle;
      tokenClassName = jsTokenColors[idleClassName](this.theme);

      const activeClassName = colors.active ? deprecatedColorNames[colors.active] || colors.active : idleClassName;
      activeTokenClassName = jsTokenColors[activeClassName](this.theme);
    }

    const tokenClassNames = cn(styles.token, tokenClassName, {
      [activeTokenClassName]: !!isActive,
      [jsStyles.warning(this.theme)]: !!warning,
      [jsStyles.error(this.theme)]: !!error,
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
        <TokenRemoveIcon className={styles.removeIcon} onClick={onRemove} />
      </div>
    );
  }
}
