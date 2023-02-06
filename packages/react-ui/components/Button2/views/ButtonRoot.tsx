import React, { useContext } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { cx } from '../../../lib/theming/Emotion';
import { ButtonProps } from '../Button';
import { styles } from '../Button.styles';
import { CommonProps } from '../../../internal/CommonWrapper';

export interface CommonViewProps extends CommonProps {
  as?: React.ElementType;
}

export interface ButtonRootProps extends CommonViewProps {
  width: ButtonProps['width'];
  arrow: ButtonProps['arrow'];
  size: ButtonProps['size'];
  use: ButtonProps['use'];
}

export type ButtonRootType = React.FC<ButtonRootProps>;

export const ButtonRoot: ButtonRootType = ({ children, width, arrow, size, use }) => {
  const theme = useContext(ThemeContext);

  const getSizeClassName = () => {
    switch (size) {
      case 'large':
        return styles.wrapLarge(theme);
      case 'medium':
        return styles.wrapMedium(theme);
      case 'small':
      default:
        return styles.wrapSmall(theme);
    }
  };

  const isLink = use === 'link';

  const props = {
    className: cx({
      [styles.wrap(theme)]: true,
      ...(isLink
        ? {
            [styles.wrapLink()]: true,
          }
        : {
            [styles.wrapArrow()]: arrow === true,
            [styles.wrapArrowLeft()]: arrow === 'left',
            [getSizeClassName()]: true,
          }),
    }),
    style: {
      width,
    },
  };

  return <span {...props}>{children}</span>;
};
