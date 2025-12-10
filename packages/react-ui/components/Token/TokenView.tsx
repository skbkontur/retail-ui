import type { ReactNode } from 'react';
import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';

import type { TokenSize } from './Token.js';
import { globalClasses, getStyles } from './Token.styles.js';

export interface TokenViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Задает размер контрола. */
  size?: TokenSize;
  /** Задает компонент крестика для удаления токена. */
  closeButton?: ReactNode;
  /** Определяет, скрывать ли крестик для удаления токена. */
  hideCloseButton?: boolean;
}

export function TokenView(props: TokenViewProps) {
  const { size = 'small', children, closeButton, hideCloseButton, className, ...rest } = props;
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);
  const theme = useContext(ThemeContext);
  const getSizeClassName = (size: TokenSize) => {
    switch (size) {
      case 'large':
        return styles.tokenLarge(theme);
      case 'medium':
        return styles.tokenMedium(theme);
      case 'small':
      default:
        return styles.tokenSmall(theme);
    }
  };
  const closeButtonNode = hideCloseButton ? null : (
    <span className={cx(styles.removeIcon(theme), globalClasses.removeIcon)}>{closeButton}</span>
  );

  return (
    <CommonWrapper {...props}>
      <div
        {...rest}
        className={cx(getSizeClassName(size), {
          [styles.token(theme)]: true,
        })}
      >
        {children}
        {closeButtonNode}
      </div>
    </CommonWrapper>
  );
}
