import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { IconProps as BaseIconProps } from './BaseIcon';

type IconSizes = 'small' | 'medium' | 'large';

type IconResizableProps = BaseIconProps & {
  // name `size` is already reserved, so `type`
  type?: IconSizes;
};

type Sizes = Record<IconSizes, React.ElementType>;

export const iconSizer = (sizes: Sizes, iconName: string) => {
  return forwardRefAndName<SVGSVGElement, IconResizableProps>(iconName, ({ type = 'small', ...props }, ref) => {
    const Icon = sizes[type];

    return <Icon ref={ref} {...props} />;
  });
};
