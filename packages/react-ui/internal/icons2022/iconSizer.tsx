import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { IconProps as BaseIconProps } from './BaseIcon';

type IconSizes = 'small' | 'medium' | 'large';

type IconSizingProps = Omit<BaseIconProps, 'size'> & {
  size?: BaseIconProps['size'] | IconSizes;
};

type Sizes = Record<IconSizes, () => React.ReactElement>;

export const DEFAULT_ICON_SIZE: IconSizes = 'small';

const aliasToSize: Record<IconSizes, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

const isAlias = (size: unknown): size is IconSizes =>
  typeof size === 'string' && Object.keys(aliasToSize).includes(size);

const getAliasFromSize = (size: number): IconSizes =>
  Object.entries(aliasToSize).sort(([, a], [, b]) =>
    Math.abs(size - a) > Math.abs(size - b) ? 1 : -1,
  )[0][0] as IconSizes;

export const iconSizer = (sizes: Sizes, iconName: string) =>
  forwardRefAndName<SVGSVGElement, IconSizingProps>(iconName, ({ size, ...props }, ref) => {
    let alias: IconSizes = DEFAULT_ICON_SIZE;
    if (size !== alias && isAlias(size)) {
      alias = size;
    } else if (typeof size === 'number') {
      alias = getAliasFromSize(size);
    }
    const Icon = sizes[alias]();

    return React.cloneElement(Icon, { ref, ...props });
  });
