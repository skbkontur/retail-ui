import React from 'react';
import cn from 'classnames';
import warningOutput from 'warning';
import styles from './Token.less';
import tokenColors from './Colors.less';
import TokenRemoveIcon from './TokenRemoveIcon';
import { emptyHandler } from '../../lib/utils';

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

export type TokenColorName = keyof typeof tokenColors;

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

class Token extends React.Component<TokenProps & TokenActions, {}> {
  public render() {
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

    const tokenClassName = disabled ?
      tokenColors.defaultDisable :
      colors ? tokenColors[colors.idle] : tokenColors.defaultIdle;

    const activeTokenClassName = disabled ?
      tokenColors.defaultDisable :
      colors ? tokenColors[colors.active || colors.idle] : tokenColors.defaultActive;

    const tokenClassNames = cn(
      styles.token,
      {
        [activeTokenClassName]: isActive,
        [styles.warning]: warning,
        [styles.error]: error,
        [styles.disabled]: disabled,
      },
      tokenClassName,
    );

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
    )
  }

  private onRemoveClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const {
      disabled,
      onRemove = emptyHandler,
    } = this.props;

    if (disabled) {
      event.preventDefault()
      return;
    }

    onRemove(event)
  }
}

export default Token;
