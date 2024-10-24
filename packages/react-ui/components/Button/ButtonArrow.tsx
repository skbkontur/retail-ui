import React, { useContext } from 'react';
import { Emotion } from '@emotion/css/create-instance';

import { EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';

import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { Button, ButtonInnerProps } from './Button';
import { getStyles, globalClasses } from './Button.styles';

type ButtonArrowProps = Pick<
  ButtonInnerProps,
  'size' | 'arrow' | 'checked' | 'disabled' | 'error' | 'use' | 'warning'
> & {
  isFocused: boolean;
};

const ButtonArrow: React.FunctionComponent<ButtonArrowProps> = ({ arrow, size = Button.defaultProps.size }) => {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  const getArrowIconRootClassName = () => {
    return emotion.cx(styles.arrowIconRoot(), globalClasses.arrow, {
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

export function useButtonArrow(props: ButtonArrowProps, theme: Theme, emotion: Emotion): [string, React.ReactNode] {
  const { arrow, size, use } = props;
  const styles = getStyles(emotion);

  const canRender = use !== 'link' && (arrow === true || arrow === 'left');

  const rootClassName = canRender
    ? emotion.cx(
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
