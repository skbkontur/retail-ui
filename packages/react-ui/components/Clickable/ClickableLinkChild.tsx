import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { clickableGlobalClasses } from './Clickable.styles';
import { linkChildStyles } from './ClickableLinkChild.styles';
import { ClickableProps } from './Clickable';

export interface ClickableLinkChildProps extends Pick<ClickableProps, 'isError'> {
  children: React.ReactNode;
  isFocused: boolean;
}

export const ClickableLinkChild = forwardRefAndName<HTMLSpanElement, ClickableLinkChildProps>(
  'ClickableLinkChild',
  ({ isFocused, isError, children }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <span
        ref={ref}
        className={cx({
          [linkChildStyles.linkLineTextWrapper(theme)]: true,
          [linkChildStyles.linkLineTextWrapperFocused(theme)]: isFocused,
          [linkChildStyles.linkError(theme)]: isError,
        })}
      >
        <span
          className={cx({
            [clickableGlobalClasses.text]: true,
            [linkChildStyles.linkLineText(theme)]: true,
          })}
        >
          {children}
        </span>
      </span>
    );
  },
);
