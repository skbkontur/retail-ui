import React, { useContext } from 'react';

import { Theme } from '../../lib/theming/Theme';
import { isKonturIcon } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { SizeProp } from '../../lib/types/props';

import { ClickableProps } from './Clickable';
import { globalClasses } from './Clickable.styles';
import { buttonIconStyles, getButtonIconSizeClassName } from './ClickableButtonIcon.styles';
import { ClickableLoadingButtonIcon } from './ClickableLoadingButtonIcon';

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
      className={cx(
        globalClasses.icon,
        buttonIconStyles.icon(),
        getButtonIconSizeClassName({ size, position, theme }),
        {
          [buttonIconStyles.iconNoMargin()]: !hasChildren,
        },
      )}
    >
      {isLoading && !hasBothIcons ? (
        <ClickableLoadingButtonIcon isCentered={false} size={size} />
      ) : (
        getIcon(icon, size, theme)
      )}
    </span>
  );
};
