import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { globalClasses } from './Clickable.styles';
import { linkStyles } from './ClickableLink.styles';

export interface ClickableLinkChildProps {
  children: React.ReactNode;
  isFocused: boolean;
}

export const ClickableLinkChild = forwardRefAndName<HTMLSpanElement, ClickableLinkChildProps>(
  'ClickableLinkChild',
  ({ isFocused, children }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <span
        ref={ref}
        className={cx(linkStyles.linkLineTextWrapper(theme), {
          [linkStyles.linkLineTextWrapperFocused(theme)]: isFocused,
        })}
      >
        <span className={cx(globalClasses.text, linkStyles.linkLineText(theme))}>{children}</span>
      </span>
    );
  },
);
