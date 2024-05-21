import React from 'react';

import { forwardRefAndName, ReactUIComponentWithRef } from '../../lib/forwardRefAndName';
import { SvgIconProps } from '../icons/16px';
import { useEmotion } from '../../lib/theming/Emotion';

import { getStyles } from './BaseIcon.styles';

export type IconProps = {
  size?: number;
  viewBoxSize?: number;
  color?: string;
  align?: 'center' | 'baseline' | 'none';
} & React.SVGAttributes<SVGElement>;

export type BothIconType =
  | ReactUIComponentWithRef<HTMLElement, SvgIconProps>
  | ReactUIComponentWithRef<SVGSVGElement, IconProps>;

export const BaseIcon = forwardRefAndName<SVGSVGElement, IconProps>(
  'BaseIcon',
  (
    { color, size, style, 'aria-hidden': ariaHidden = true, viewBoxSize = 16, align = 'center', children, ...rest },
    ref,
  ) => {
    const emotion = useEmotion();
    const icon = (
      <svg
        ref={ref}
        width={size || viewBoxSize}
        height={size || viewBoxSize}
        style={{
          fill: color ?? 'currentColor',
          marginBottom: align === 'none' || align === 'center' ? 0 : '-0.1875em',
          flexShrink: 0,
          ...style,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        aria-hidden={ariaHidden}
        {...rest}
      >
        {children}
      </svg>
    );

    if (align === 'center') {
      const styles = getStyles(emotion);
      return <span className={styles.centeredIcon()}>{icon}</span>;
    }

    return icon;
  },
);
