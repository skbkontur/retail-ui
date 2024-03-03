import React, { useContext } from 'react';

import { Theme } from '../../lib/theming/Theme';
import { isKonturIcon } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { SizeProp } from '../../lib/types/props';

import { ClickableProps } from './Clickable';
import { buttonIconStyles, getButtonIconSizeClassName } from './ClickableButtonIcon.styles';
import { ClickableButtonLoadingIcon } from './ClickableButtonLoadingIcon';
import { buttonGlobalClasses } from './ClickableButton.styles';

export interface ClickableButtonIconProps extends Pick<ClickableProps, 'size' | 'isLoading'> {
  icon: ClickableProps['leftIcon'];
  position: 'right' | 'left';
  hasChildren: boolean;
  hasBothIcons?: boolean;
}

const getButtonIconSizes = (theme: Theme): Record<SizeProp, number> => {
  return {
    small: parseInt(theme.btnIconSizeSmall),
    medium: parseInt(theme.btnIconSizeMedium),
    large: parseInt(theme.btnIconSizeLarge),
  };
};

const getIcon = (icon: React.ReactNode, size: SizeProp, theme: Theme) => {
  if (icon && React.isValidElement(icon) && isKonturIcon(icon)) {
    const sizes = getButtonIconSizes(theme);
    return React.cloneElement(icon, { size: icon.props.size ?? sizes[size] });
  }

  return icon;
};

export const ClickableButtonIcon = ({
  icon,
  position,
  hasChildren,
  isLoading = false,
  hasBothIcons = false,
  size = 'small',
}: ClickableButtonIconProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx({
        [buttonGlobalClasses.icon]: true,
        [buttonIconStyles.icon()]: true,
        [buttonIconStyles.iconNoMargin()]: !hasChildren,
        ...getButtonIconSizeClassName(size, position, theme),
      })}
    >
      {isLoading && !hasBothIcons ? (
        <ClickableButtonLoadingIcon isCentered={false} size={size} />
      ) : (
        getIcon(icon, size, theme)
      )}
    </span>
  );
};
