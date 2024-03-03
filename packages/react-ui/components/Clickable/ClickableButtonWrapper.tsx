import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { ClickableProps } from './Clickable';
import { buttonWrapperStyles } from './ClickableButtonWrapper.styles';

export type ClickableButtonWrapperProps = Pick<ClickableProps, 'width' | 'size' | 'children'>;

export const ClickableButtonWrapper = ({ width, size, children }: ClickableButtonWrapperProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      style={{ width }}
      className={cx({
        [buttonWrapperStyles.buttonWrapper(theme)]: true,
        [buttonWrapperStyles.buttonWrapperSmall(theme)]: size === 'small' || size === undefined,
        [buttonWrapperStyles.buttonWrapperMedium(theme)]: size === 'medium',
        [buttonWrapperStyles.buttonWrapperLarge(theme)]: size === 'large',
      })}
    >
      {children}
    </span>
  );
};
