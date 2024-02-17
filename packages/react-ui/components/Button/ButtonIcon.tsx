import React, { useContext } from 'react';

import { Theme } from '../../lib/theming/Theme';
import { isKonturIcon } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';
import { SizeProp } from '../../lib/types/props';

import { ButtonProps } from './Button';
import { globalClasses } from './Button.styles';
import { styles } from './ButtonIcon.styles';

type ButtonIconProps = Pick<ButtonProps, 'size' | 'icon' | 'loading' | 'disabled' | 'use'> & {
  hasChildren: boolean;
  position: 'right' | 'left';
  hasBothIcons?: boolean;
};

export const getButtonIconSizes = (theme: Theme): Record<SizeProp, number> => {
  return {
    small: parseInt(theme.btnIconSizeSmall),
    medium: parseInt(theme.btnIconSizeMedium),
    large: parseInt(theme.btnIconSizeLarge),
  };
};

export const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({
  icon,
  hasChildren,
  use,
  position,
  loading = false,
  hasBothIcons = false,
  size = 'small',
}) => {
  const theme = useContext(ThemeContext);
  const isLink = use === 'link';

  const getSizeIconClassName = () => {
    switch (size) {
      case 'large':
        return [
          styles.iconLarge(theme),
          position === 'left' ? styles.iconLargeLeft(theme) : styles.iconLargeRight(theme),
        ];
      case 'medium':
        return [
          styles.iconMedium(theme),
          position === 'left' ? styles.iconMediumLeft(theme) : styles.iconMediumRight(theme),
        ];
      case 'small':
      default:
        return [
          styles.iconSmall(theme),
          position === 'left' ? styles.iconSmallLeft(theme) : styles.iconSmallRight(theme),
        ];
    }
  };

  const style: React.CSSProperties = isTheme2022(theme)
    ? {
        display: 'inline-flex',
        alignItems: 'center',
      }
    : {};

  let _icon = icon;
  const sizes = getButtonIconSizes(theme);
  if (icon && isTheme2022(theme) && isKonturIcon(icon)) {
    _icon = React.cloneElement(icon, { size: icon.props.size ?? sizes[size] });
  }

  return (
    <span
      style={style}
      className={cx(globalClasses.icon, styles.icon(theme), getSizeIconClassName(), {
        [styles.iconNoMargin()]: !hasChildren,
        [styles.iconLeftLink(theme)]: isLink && position === 'left',
        [styles.iconRightLink(theme)]: isLink && position === 'right',
      })}
    >
      {loading && !hasBothIcons ? <LoadingIcon size={size} /> : _icon}
    </span>
  );
};
