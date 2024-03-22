import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { clickableGlobalClasses } from './Clickable.styles';
import { linkChildStyles } from './ClickableLinkChild.styles';
import { ClickableProps } from './Clickable';

export interface ClickableLinkChildProps extends Pick<ClickableProps, 'error'> {
  children: React.ReactNode;
  focused: boolean;
}

export const ClickableLinkChild = forwardRefAndName<HTMLSpanElement, ClickableLinkChildProps>(
  'ClickableLinkChild',
  ({ focused, error, children }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <span
        ref={ref}
        className={cx({
          [linkChildStyles.linkLineTextWrapper(theme)]: true,
          [linkChildStyles.linkLineTextWrapperFocused(theme)]: focused,
          [linkChildStyles.linkError(theme)]: error,
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
