import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { useResponsiveLayout } from '../../components/ResponsiveLayout';
import { useEmotion } from '../../lib/theming/Emotion';
import { CommonProps } from '../CommonWrapper';
import { SizeProp } from '../../lib/types/props';
import { useTheme } from '../../lib/theming/useTheme';

import { getStyles } from './MenuMessage.styles';

export interface MenuMessageProps extends CommonProps {
  children: React.ReactNode;
  as?: React.ElementType;
  size?: SizeProp;
}

export const MenuMessageDataTids = {
  root: 'MenuMessage__root',
} as const;

export const MenuMessage = forwardRefAndName<HTMLOrSVGElement, MenuMessageProps>(
  'MenuMessage',
  ({ children, className, size = 'small', as: Tag = 'p', ...rest }, ref) => {
    const { isMobile } = useResponsiveLayout();
    const theme = useTheme();
    const emotion = useEmotion();
    const styles = getStyles(emotion);

    const getMenuMessageSizeClassName = () => {
      switch (size) {
        case 'large':
          return emotion.cx(styles.rootLarge(theme));
        case 'medium':
          return emotion.cx(styles.rootMedium(theme));
        case 'small':
        default:
          return emotion.cx(styles.rootSmall(theme));
      }
    };

    return (
      <Tag
        ref={ref}
        data-tid={MenuMessageDataTids.root}
        className={emotion.cx(
          getMenuMessageSizeClassName(),
          {
            [styles.root(theme)]: true,
            [styles.rootMobile(theme)]: isMobile,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
