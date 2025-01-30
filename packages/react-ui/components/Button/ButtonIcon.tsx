import React, { useContext } from 'react';

import { Theme } from '../../lib/theming/Theme';
import { isKonturIcon } from '../../lib/utils';
import { EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { SizeProp } from '../../lib/types/props';

import { ButtonInnerProps } from './Button';
import { getStyles } from './ButtonIcon.styles';
import { LoadingButtonIcon } from './LoadingButtonIcon';

export interface ButtonIconProps extends Pick<ButtonInnerProps, 'size' | 'icon' | 'loading' | 'use'> {
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
  const theme = useContext(ThemeContext);
  if (icon && isKonturIcon(icon)) {
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
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);

  const isLink = use === 'link';
  const styles = getStyles(emotion);

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

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
  };

  const _icon = useIcon(icon, size);

  return (
    <span
      style={style}
      className={emotion.cx(styles.icon(), getSizeIconClassName(), {
        [styles.iconNoMargin()]: !hasChildren,
        [styles.iconLeftLink(theme)]: isLink && position === 'left',
        [styles.iconRightLink(theme)]: isLink && position === 'right',
      })}
    >
      {loading && !hasBothIcons ? <LoadingButtonIcon isCentered={false} size={size} /> : _icon}
    </span>
  );
};
