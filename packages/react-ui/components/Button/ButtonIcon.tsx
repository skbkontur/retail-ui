import React from 'react';

import { Theme } from '../../lib/theming/Theme';
import { isKonturIcon } from '../../lib/utils';
import { useEmotion } from '../../lib/theming/Emotion';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { SizeProp } from '../../lib/types/props';
import { useTheme } from '../../lib/theming/useTheme';

import { ButtonProps } from './Button';
import { getStyles } from './ButtonIcon.styles';
import { LoadingButtonIcon } from './LoadingButtonIcon';

export interface ButtonIconProps extends Pick<ButtonProps, 'size' | 'icon' | 'loading' | 'use'> {
  position: 'right' | 'left';
  hasChildren: boolean;
  hasBothIcons?: boolean;
}

export const getButtonIconSizes = (theme: Theme): Record<SizeProp, number> => {
  return {
    small: parseInt(theme.btnIconSizeSmall),
    medium: parseInt(theme.btnIconSizeMedium),
    large: parseInt(theme.btnIconSizeLarge),
  };
};

const useIcon = (icon: any, size: SizeProp) => {
  const theme = useTheme();
  if (icon && isTheme2022(theme) && isKonturIcon(icon)) {
    const sizes = getButtonIconSizes(theme);
    return React.cloneElement(icon, { size: icon.props.size ?? sizes[size] });
  }

  return icon;
};

export const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({
  icon,
  use,
  position,
  hasChildren,
  loading = false,
  hasBothIcons = false,
  size = 'small',
}) => {
  const theme = useTheme();
  const emotion = useEmotion();
  const styles = getStyles(emotion);

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

  const _icon = useIcon(icon, size);

  return (
    <span
      style={style}
      className={emotion.cx(styles.icon(theme), getSizeIconClassName(), {
        [styles.iconNoMargin()]: !hasChildren,
        [styles.iconLeftLink(theme)]: isLink && position === 'left',
        [styles.iconRightLink(theme)]: isLink && position === 'right',
      })}
    >
      {loading && !hasBothIcons ? <LoadingButtonIcon isCentered={false} size={size} /> : _icon}
    </span>
  );
};
