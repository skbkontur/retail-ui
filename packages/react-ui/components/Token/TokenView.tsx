import React, { ReactNode, useContext } from 'react';

import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { TokenSize } from './Token';
import { globalClasses, styles } from './Token.styles';

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
