import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';

import { styles } from './Radio.styles';
import { RadioProps } from './Radio';

export type RadioLabelInterface = {
  children: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
};

export type RadioLabelProps = RadioLabelInterface &
  Pick<RadioProps, 'checked' | 'onMouseOver' | 'onMouseEnter' | 'onMouseLeave' | 'style' | 'className'>;

export const RadioLabel = ({
  children,
  checked,
  onMouseOver,
  onMouseEnter,
  onMouseLeave,
  inputRef,
  style,
  className,
  ...rest
}: RadioLabelProps) => {
  const theme = useContext(ThemeContext);

  return (
    <label
      className={cx(styles.root(theme), checked && styles.rootChecked(theme), className)}
      onMouseOver={(e) => onMouseOver?.(e)}
      onMouseEnter={(e) => onMouseEnter?.(e)}
      onMouseLeave={(e) => onMouseLeave?.(e)}
      onClick={fixFirefoxModifiedClickOnLabel(inputRef)}
      style={style}
      {...rest}
    >
      {children}
    </label>
  );
};
