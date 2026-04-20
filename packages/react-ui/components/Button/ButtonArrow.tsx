import type { Emotion } from '@emotion/css/create-instance';
import React, { useContext } from 'react';

import { useEmotion, useStyles } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { ArrowLeftIcon } from './ArrowLeftIcon.js';
import { ArrowRightIcon } from './ArrowRightIcon.js';
import type { ButtonInnerProps } from './Button.js';
import { getStyles, globalClasses } from './Button.styles.js';

type ButtonArrowProps = Pick<
  ButtonInnerProps,
  'size' | 'arrow' | 'checked' | 'disabled' | 'error' | 'use' | 'warning'
> & {
  isFocused: boolean;
};

const ButtonArrow: React.FunctionComponent<ButtonArrowProps> = ({ arrow, size }) => {
  const theme = useContext(ThemeContext);
  const { cx } = useEmotion();
  const styles = useStyles(getStyles);

  const getArrowIconRootClassName = () => {
    return cx(styles.arrowIconRoot(), globalClasses.arrow, {
      [styles.arrowIconRootSmall(theme)]: size === 'small',
      [styles.arrowIconRootMedium(theme)]: size === 'medium',
      [styles.arrowIconRootLarge(theme)]: size === 'large',
      [styles.arrowIconLeft()]: arrow === 'left',
    });
  };

  const arrowIcons = {
    right: ArrowRightIcon,
    left: ArrowLeftIcon,
  };
  const side = arrow === 'left' ? 'left' : 'right';
  const ArrowIcon = arrowIcons[side];
  const arrowNode = (
    <div className={getArrowIconRootClassName()}>
      <ArrowIcon size={size} />
    </div>
  );

  return arrowNode;
};

export function useButtonArrow(
  props: ButtonArrowProps,
  theme: Theme,
  styles: ReturnType<typeof getStyles>,
  cx: Emotion['cx'],
): [string, React.ReactNode] {
  const { arrow, size, use } = props;

  const canRender = use !== 'link' && (arrow === true || arrow === 'left');

  const rootClassName = canRender
    ? cx(
        arrow === true && size === 'small' && styles.withArrowIconRightSmall(theme),
        arrow === true && size === 'medium' && styles.withArrowIconRightMedium(theme),
        arrow === true && size === 'large' && styles.withArrowIconRightLarge(theme),
        arrow === 'left' && size === 'small' && styles.withArrowIconLeftSmall(theme),
        arrow === 'left' && size === 'medium' && styles.withArrowIconLeftMedium(theme),
        arrow === 'left' && size === 'large' && styles.withArrowIconLeftLarge(theme),
      )
    : '';

  const arrowNode = canRender ? <ButtonArrow {...props} /> : null;

  return [rootClassName, arrowNode];
}
