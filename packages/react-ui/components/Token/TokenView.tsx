import React, { ReactNode } from 'react';

import { CommonWrapper } from '../../internal/CommonWrapper';
import { useEmotion } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { useTheme } from '../../lib/theming/useTheme';

import { TokenSize } from './Token';
import { getStyles, globalClasses } from './Token.styles';

export interface TokenViewProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: TokenSize;
  closeButton?: ReactNode;
  hideCloseButton?: boolean;
}

export function TokenView(props: TokenViewProps) {
  const { size = 'small', children, closeButton, hideCloseButton, className, ...rest } = props;
  const theme = useTheme();
  const emotion = useEmotion();
  const styles = getStyles(emotion);

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
    <span className={emotion.cx(styles.removeIcon(theme), globalClasses.removeIcon)}>{closeButton}</span>
  );

  return (
    <CommonWrapper {...props}>
      <div
        {...rest}
        className={emotion.cx(getSizeClassName(size), {
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
