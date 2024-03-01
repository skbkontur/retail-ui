import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { globalClasses } from './Clickable.styles';
import { buttonStyles } from './ClickableButton.styles';
import { ClickableProps } from './Clickable';

export type ClickableButtonWrapperProps = Pick<ClickableProps, 'width' | 'size' | 'children'>;

export const ClickableButtonWrapper = ({ width, size, children }: ClickableButtonWrapperProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      style={{ width }}
      className={cx(globalClasses.root, {
        [buttonStyles.buttonWrap(theme)]: true,
        [buttonStyles.buttonWrapSmall(theme)]: size === 'small' || size === undefined,
        [buttonStyles.buttonWrapMedium(theme)]: size === 'medium',
        [buttonStyles.buttonWrapLarge(theme)]: size === 'large',
      })}
    >
      {children}
    </span>
  );
};
