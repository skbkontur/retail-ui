import * as React from 'react';

export interface RemoveIconProps {
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

const RemoveIcon = (props: RemoveIconProps) => (
  <svg
    {...props}
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.414"
    clipRule="evenodd"
    viewBox="0 0 14 14"
  >
    <rect width={14} height={14} y=".288" fill="none" />
    <path d="M7.62,7.295l5.404,5.404l-0.608,0.608l-5.404,-5.404l-5.404,5.404l-0.608,-0.608l5.404,-5.404l-5.404,-5.404l0.608,-0.608l5.404,5.404l5.404,-5.404l0.608,0.608l-5.404,5.404Z" />
  </svg>
);

export default RemoveIcon;
