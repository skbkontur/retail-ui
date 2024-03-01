import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { ClickableProps } from './Clickable';
import { globalClasses } from './Clickable.styles';
import { buttonStyles } from './ClickableButton.styles';

type ClickableButtonArrowProps = Pick<ClickableProps, 'use' | 'size' | 'arrow'>;

export const ClickableButtonArrow = ({ arrow, size }: ClickableButtonArrowProps) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={cx({
        [globalClasses.arrow]: true,
        [buttonStyles.buttonArrowIconRoot()]: true,
        [buttonStyles.buttonArrowIconLeft()]: arrow === 'left',
        [buttonStyles.buttonArrowIconRootSmall(theme)]: size === 'small',
        [buttonStyles.buttonArrowIconRootMedium(theme)]: size === 'medium',
        [buttonStyles.buttonArrowIconRootLarge(theme)]: size === 'large',
      })}
    >
      {arrow === 'left' ? <ArrowLeftIcon size={size} /> : <ArrowRightIcon size={size} />}
    </div>
  );
};
