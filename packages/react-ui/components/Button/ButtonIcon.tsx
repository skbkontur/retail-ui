import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { ZERO_WIDTH_SPACE } from '../../lib/chars';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';

import { ButtonProps } from './Button';
import { globalClasses, styles } from './Button.styles';

type ButtonIconProps = Pick<ButtonProps, 'size' | 'icon' | 'loading' | 'disabled' | 'use'> & {
  hasChildren: boolean;
};

export const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({
  icon,
  hasChildren,
  use,
  loading = false,
  size = 'small',
}) => {
  const theme = useContext(ThemeContext);
  const isLink = use === 'link';

  const getSizeIconClassName = () => {
    switch (size) {
      case 'large':
        return styles.iconLarge(theme);
      case 'medium':
        return styles.iconMedium(theme);
      case 'small':
      default:
        return styles.iconSmall(theme);
    }
  };

  const space = isTheme2022(theme) ? ZERO_WIDTH_SPACE : '';
  const style: React.CSSProperties = isTheme2022(theme)
    ? {
        display: 'inline-flex',
        alignItems: 'center',
      }
    : {};

  return (
    <span
      style={style}
      className={cx(globalClasses.icon, styles.icon(), getSizeIconClassName(), {
        [styles.iconNoRightMargin()]: !hasChildren,
        [styles.iconLink(theme)]: isLink,
      })}
    >
      {space}
      {loading ? <LoadingIcon size={size} /> : icon}
    </span>
  );
};
