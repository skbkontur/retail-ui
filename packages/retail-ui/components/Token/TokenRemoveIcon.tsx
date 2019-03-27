import * as React from 'react';

export interface RemoveIconProps {
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

// в Colors.less связываемся по дата атрибуту data-name="RemoveIcon"
const TokenRemoveIcon = (props: RemoveIconProps) => (
  <svg
    {...props}
    data-name="RemoveIcon"
    fillRule="evenodd"
    strokeLinejoin="round"
    clipRule="evenodd"
    viewBox="0 0 10 10"
  >
    <polygon id="Path" points="6 5 10 9 9 10 5 6 1 10 0 9 4 5 0 1 1 0 5 4 9 0 10 1" />
  </svg>
);

export default TokenRemoveIcon;
