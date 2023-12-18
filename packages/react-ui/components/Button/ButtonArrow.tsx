import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { Theme } from '../../lib/theming/Theme';

import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { Button, ButtonProps } from './Button';
import { globalClasses, styles } from './Button.styles';

type ButtonArrowProps = Pick<ButtonProps, 'size' | 'arrow' | 'checked' | 'disabled' | 'error' | 'use' | 'warning'> & {
  isFocused: boolean;
};

const ButtonArrow: React.FunctionComponent<ButtonArrowProps> = ({
  arrow,
  size = Button.defaultProps.size,
  disabled,
  checked,
  error,
  warning,
  isFocused,
}) => {
  const theme = useContext(ThemeContext);
  const _isTheme2022 = isTheme2022(theme);

  const getArrowIconRootClassName = () => {
    return cx(styles.arrowIconRoot(), globalClasses.arrow, {
      [styles.arrowIconRootSmall(theme)]: size === 'small',
      [styles.arrowIconRootMedium(theme)]: size === 'medium',
      [styles.arrowIconRootLarge(theme)]: size === 'large',
      [styles.arrowIconLeft()]: arrow === 'left',
    });
  };

  let arrowNode = null;

  if (_isTheme2022) {
    const arrowIcons = {
      right: ArrowRightIcon,
      left: ArrowLeftIcon,
    };
    const side = arrow === 'left' ? 'left' : 'right';
    const ArrowIcon = arrowIcons[side];
    arrowNode = (
      <div className={getArrowIconRootClassName()}>
        <ArrowIcon size={size} />
      </div>
    );
  } else {
    arrowNode = (
      <div
        className={cx({
          [styles.arrow()]: true,
          [styles.arrowWarning(theme)]: !checked && warning && !disabled,
          [styles.arrowError(theme)]: !checked && error && !disabled,
          [styles.arrowFocus(theme)]: !checked && isFocused && !disabled,
          [styles.arrowLeft()]: arrow === 'left',
        })}
      >
        <div className={cx(globalClasses.arrowHelper, globalClasses.arrowHelperTop)} />
        <div className={cx(globalClasses.arrowHelper, globalClasses.arrowHelperBottom)} />
      </div>
    );
  }

  return arrowNode;
};

export function useButtonArrow(props: ButtonArrowProps, theme: Theme): [string, string, React.ReactNode] {
  const { arrow, size, use } = props;
  const _isTheme2022 = isTheme2022(theme);
  const canRender = use !== 'link' && (arrow === true || arrow === 'left');

  const rootClassName =
    !_isTheme2022 && canRender
      ? ''
      : cx(
          arrow === true && size === 'small' && styles.withArrowIconRightSmall(theme),
          arrow === true && size === 'medium' && styles.withArrowIconRightMedium(theme),
          arrow === true && size === 'large' && styles.withArrowIconRightLarge(theme),
          arrow === 'left' && size === 'small' && styles.withArrowIconLeftSmall(theme),
          arrow === 'left' && size === 'medium' && styles.withArrowIconLeftMedium(theme),
          arrow === 'left' && size === 'large' && styles.withArrowIconLeftLarge(theme),
        );

  const wrapClassName =
    _isTheme2022 && canRender
      ? ''
      : cx({
          [styles.wrapArrow()]: arrow === true,
          [styles.wrapArrowLeft()]: arrow === 'left',
        });

  const arrowNode = canRender ? <ButtonArrow {...props} /> : null;

  return [wrapClassName, rootClassName, arrowNode];
}
