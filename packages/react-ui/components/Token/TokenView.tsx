import React, { ReactNode, useContext } from 'react';

import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';

import { TokenSize } from './Token';
import { globalClasses, styles } from './Token.styles';

export interface TokenViewProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: TokenSize;
  closeButton?: ReactNode;
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
          [styles.token2022(theme)]: isTheme2022(theme),
        })}
      >
        {children}
        {closeButtonNode}
      </div>
    </CommonWrapper>
  );
}
