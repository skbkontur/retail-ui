import React, { ReactNode, useContext } from 'react';

import { CommonWrapper } from '../../internal/CommonWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { TokenSize } from './Token';
import { styles } from './Token.styles';

export interface TokenViewProps {
  size?: TokenSize;
  textHolder: ReactNode;
  closeButton?: ReactNode;
  className?: string;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export function TokenView(props: TokenViewProps) {
  const { size = 'small', textHolder, closeButton, className, ...rest } = props;
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
  const getCrosslessSizeClassName = (size: TokenSize) => {
    switch (size) {
      case 'large':
        return styles.crosslessGapLarge(theme);
      case 'medium':
        return styles.crosslessGapMedium(theme);
      case 'small':
      default:
        return styles.crosslessGapSmall(theme);
    }
  };

  return (
    <CommonWrapper {...props}>
      <div
        className={cx(getSizeClassName(size), className, {
          [styles.token(theme)]: true,
          [getCrosslessSizeClassName(size)]: !closeButton,
        })}
        {...rest}
      >
        {textHolder}
        {closeButton}
      </div>
    </CommonWrapper>
  );
}
