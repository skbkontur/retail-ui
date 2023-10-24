import React, { ReactNode, useContext } from 'react';

import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { HTMLProps } from '../../typings/html';

import { TokenSize } from './Token';
import { globalClasses, styles } from './Token.styles';

export interface TokenViewProps
  extends Pick<HTMLProps['div'], 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'> {
  size?: TokenSize;
  children: ReactNode;
  closeButton?: ReactNode;
  className?: string;
  onRemove?: React.MouseEventHandler<HTMLElement>;
}

export function TokenView(props: TokenViewProps) {
  const { size = 'small', children, closeButton, className, ...rest } = props;
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

  return (
    <CommonWrapper {...props}>
      <div
        className={cx(getSizeClassName(size), className, {
          [styles.token(theme)]: true,
        })}
        {...rest}
      >
        {children}
        <span className={cx(styles.removeIcon(theme), globalClasses.removeIcon)}>{closeButton}</span>
      </div>
    </CommonWrapper>
  );
}
