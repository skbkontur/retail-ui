import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { ClickableProps } from './Clickable';
import { buttonGlobalClasses } from './ClickableButton.styles';
import { buttonArrowStyles } from './ClickableButtonArrow.styles';

type ClickableButtonArrowProps = Pick<ClickableProps, 'use' | 'size' | 'arrow'>;

export const ClickableButtonArrow = ({ arrow, size }: ClickableButtonArrowProps) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={cx({
        [buttonGlobalClasses.arrow]: true,
        [buttonArrowStyles.buttonArrowIconRoot()]: true,
        [buttonArrowStyles.buttonArrowIconRootSmall(theme)]: size === 'small',
        [buttonArrowStyles.buttonArrowIconRootMedium(theme)]: size === 'medium',
        [buttonArrowStyles.buttonArrowIconRootLarge(theme)]: size === 'large',
        [buttonArrowStyles.buttonArrowIconLeft()]: arrow === 'left',
      })}
    >
      {arrow === 'left' && <ArrowLeftIcon size={size} />}
      {arrow === 'right' && <ArrowRightIcon size={size} />}
    </div>
  );
};
