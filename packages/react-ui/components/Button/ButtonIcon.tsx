import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';

import { ButtonProps } from './Button';
import { styles } from './Button.styles';

type ButtonIconProps = Pick<ButtonProps, 'size' | 'icon' | 'loading' | 'disabled' | 'use'> & {
  hasChildren: boolean;
};

export const ButtonIcon: React.FunctionComponent<ButtonIconProps> = ({
  icon,
  hasChildren,
  use,
  loading = false,
  size = 'small',
}) => {
  const theme = useContext(ThemeContext);
  const isLink = use === 'link';

  const getSizeIconClassName = () => {
    switch (size) {
      case 'large':
        return styles.iconLarge(theme);
      case 'medium':
        return styles.iconMedium(theme);
      case 'small':
      default:
        return styles.iconSmall(theme);
    }
  };

  const type = isTheme2022(theme) ? size : 'mini';
  const space = isTheme2022(theme) ? String.fromCharCode(8203) : '';
  const style: React.CSSProperties = isTheme2022(theme)
    ? {
        display: 'inline-flex',
        alignItems: 'center',
      }
    : {};

  const spinnerNode = () => <Spinner caption={null} dimmed type={type} />;

  return (
    <span
      style={style}
      className={cx(styles.icon(), getSizeIconClassName(), {
        [styles.iconNoRightMargin()]: !hasChildren,
        [styles.iconLink(theme)]: isLink,
      })}
    >
      {space}
      {loading ? spinnerNode() : icon}
    </span>
  );
};
