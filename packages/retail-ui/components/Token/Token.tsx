import React from 'react';
import warningOutput from 'warning';
import styles from './Token.less';
import TokenRemoveIcon from './TokenRemoveIcon';
import { emptyHandler } from '../../lib/utils';
import { cx as cn } from 'emotion';
import ThemeManager from '../../lib/ThemeManager';
import jsStyles from './Token.styles';
import jsTokenColors from './Colors.styles';
const theme = ThemeManager.getTheme();

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

export const Token: React.SFC<TokenProps & TokenActions> = ({
  children,
  isActive,
  colors,
  error,
  warning,
  onClick = emptyHandler,
  onRemove = emptyHandler,
  onMouseEnter = emptyHandler,
  onMouseLeave = emptyHandler,
  onFocus = emptyHandler,
  onBlur = emptyHandler,
}) => {
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

  let tokenClassName = jsTokenColors.defaultIdle(theme);
  let activeTokenClassName = jsTokenColors.defaultActive(theme);
  if (colors) {
    const idleClassName = deprecatedColorNames[colors.idle] || colors.idle;
    tokenClassName = jsTokenColors[idleClassName](theme);

    const activeClassName = colors.active ? deprecatedColorNames[colors.active] || colors.active : idleClassName;
    activeTokenClassName = jsTokenColors[activeClassName](theme);
  }

  const tokenClassNames = cn(styles.token, tokenClassName, {
    [activeTokenClassName]: !!isActive,
    [jsStyles.warning(theme)]: !!warning,
    [jsStyles.error(theme)]: !!error,
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
};

export default Token;
