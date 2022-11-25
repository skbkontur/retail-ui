import React from 'react';

import { ReactUIComponentWithRef } from '../../lib/forwardRefAndName';
import { SvgIconProps } from '../icons/16px';

export type IconProps = {
  ref?: React.ForwardedRef<SVGSVGElement>;
  size?: number;
  viewBoxSize?: number;
  color?: string;
  disableCompensation?: boolean;
} & React.SVGAttributes<SVGElement>;

export type BothIconType =
  | ReactUIComponentWithRef<HTMLElement, SvgIconProps>
  | ReactUIComponentWithRef<SVGSVGElement, IconProps>;

export const BaseIcon = ({
  ref,
  color,
  size,
  viewBoxSize = 16,
  style,
  disableCompensation = true,
  children,
  ...rest
}: IconProps) => {
  return (
    <svg
      ref={ref}
      width={size || viewBoxSize}
      height={size || viewBoxSize}
      style={{ fill: color ?? 'currentColor', color, marginBottom: disableCompensation ? 0 : '-0.1875em', ...style }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
};
