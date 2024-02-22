import { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { ClickableProps } from './Clickable';
import { buttonStyles } from './ClickableButton.styles';

export const useButtonSize = (
  size: ClickableProps['size'],
  icon: ClickableProps['leftIcon'],
  children: ClickableProps['children'],
) => {
  const theme = useContext(ThemeContext);

  if (size === 'large') {
    return cx(buttonStyles.buttonSizeLarge(theme), {
      [buttonStyles.buttonSizeLargeWithIcon(theme)]: !!icon,
      [buttonStyles.buttonSizeLargeWithIconWithoutText(theme)]: !!icon && !children,
    });
  }

  if (size === 'medium') {
    return cx(buttonStyles.buttonSizeMedium(theme), {
      [buttonStyles.buttonSizeMediumWithIcon(theme)]: !!icon,
      [buttonStyles.buttonSizeMediumWithIconWithoutText(theme)]: !!icon && !children,
    });
  }

  return cx(buttonStyles.buttonSizeSmall(theme), {
    [buttonStyles.buttonSizeSmallWithIcon(theme)]: !!icon,
    [buttonStyles.buttonSizeSmallWithIconWithoutText(theme)]: !!icon && !children,
  });
};
