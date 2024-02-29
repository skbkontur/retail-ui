import React, { useContext } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';

import { ClickableProps } from './Clickable';
import { linkStyles } from './ClickableLink.styles';

export type ClickableLinkIconProps = Pick<ClickableProps, 'leftIcon' | 'isLoading'>;

export const ClickableLinkIcon = forwardRefAndName<HTMLSpanElement, ClickableLinkIconProps>(
  'ClickableLinkIcon',
  ({ leftIcon, isLoading }) => {
    const theme = useContext(ThemeContext);

    let child = leftIcon;
    if (isLoading && leftIcon) {
      child = <Spinner caption={null} dimmed inline />;
    }

    return <span className={linkStyles.linkIcon(theme)}>{child}</span>;
  },
);
