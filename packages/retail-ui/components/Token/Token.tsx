import React from 'react';
import cn from 'classnames';
import warningOutput from 'warning';
import styles from './Token.less';
import tokenColors from './Colors.less';
import TokenRemoveIcon from './TokenRemoveIcon';

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
  'd-red': 'redActive'
};

export type TokenColorName = keyof typeof tokenColors;

export interface TokenColors {
  idle: TokenColorName;
  active?: TokenColorName;
}

interface TokenActions {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<SVGElement>;
}

export interface TokenProps {
  colors?: TokenColors;
  isActive?: boolean;
  error?: boolean;
  warning?: boolean;
}

const Token: React.SFC<TokenProps & TokenActions> = ({
  children,
  isActive,
  colors,
  error,
  warning,
  onClick = () => undefined,
  onRemove = () => undefined
}) => {
  if (process.env.NODE_ENV !== 'production' && colors) {
    warningOutput(
      !deprecatedColorNames[colors.idle],
      `Color name '${colors.idle}' has been depricated, use '${
        deprecatedColorNames[colors.idle]
      }' instead`
    );

    if (colors.active) {
      warningOutput(
        !deprecatedColorNames[colors.active],
        `Color name '${colors.active}' has been depricated, use '${
          deprecatedColorNames[colors.active]
        }' instead`
      );
    }
  }

  const tokenClassName = colors
    ? tokenColors[colors.idle]
    : tokenColors.defaultIdle;

  const activeTokenClassName = colors
    ? tokenColors[colors.active || colors.idle]
    : tokenColors.defaultActive;

  const tokenClassNames = cn(
    styles.token,
    {
      [activeTokenClassName]: isActive,
      [styles.warning]: warning,
      [styles.error]: error
    },
    tokenClassName
  );

  return (
    <div className={tokenClassNames} onClick={onClick}>
      {children}
      <TokenRemoveIcon className={styles.removeIcon} onClick={onRemove} />
    </div>
  );
};

export default Token;
