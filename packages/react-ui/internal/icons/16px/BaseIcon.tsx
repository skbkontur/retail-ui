import React from 'react';

export type IconProps = {
  ref?: React.ForwardedRef<SVGSVGElement>;
  size?: number;
  color?: string;
  disableCompensation?: boolean;
} & React.SVGAttributes<SVGElement>;

export const BaseIcon = ({
  ref,
  color,
  size = 16,
  style,
  disableCompensation = true,
  children,
  ...rest
}: IconProps) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      style={{ fill: color ?? 'currentColor', color, marginBottom: disableCompensation ? 0 : '-0.1875em', ...style }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 16 16`}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
};
