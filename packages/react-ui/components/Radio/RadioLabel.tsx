import React, { useContext } from 'react';
import { RadioRef } from 'react-ui';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';

import { styles } from './Radio.styles';
import { RadioProps } from './Radio';

type RadioLabelInterface = {
  children: React.ReactNode;
};

export type RadioLabelProps = Pick<RadioRef, 'inputRef'> &
  RadioLabelInterface &
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
      className={cx(
        {
          [styles.root(theme)]: true,
          [styles.rootChecked(theme)]: checked,
        },
        className,
      )}
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
