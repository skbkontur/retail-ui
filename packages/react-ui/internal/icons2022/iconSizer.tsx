import React from 'react';

import { forwardRefAndIconName } from '../../lib/forwardRefAndName';

import type { IconProps as BaseIconProps } from './BaseIcon';
import type { IconSizeAliases } from './iconConstants';
import { ALIASES_TO_SIZES, DEFAULT_ICON_ALIAS } from './iconConstants';

type Sizes = Record<IconSizeAliases, () => React.ReactElement>;

type IconSizingProps = Omit<BaseIconProps, 'size'> & {
  size?: BaseIconProps['size'] | IconSizeAliases;
};

const isAlias = (size: unknown): size is IconSizeAliases =>
  typeof size === 'string' && Object.keys(ALIASES_TO_SIZES).includes(size);

const getAliasFromSize = (size: number) =>
  Object.entries(ALIASES_TO_SIZES).sort(([, a], [, b]) =>
    Math.abs(size - a) > Math.abs(size - b) ? 1 : -1,
  )[0][0] as IconSizeAliases;

export const iconSizer = <T extends IconSizingProps>(sizes: Sizes, iconName: string) =>
  forwardRefAndIconName<SVGSVGElement, IconSizingProps & T>(
    iconName,
    ({ size = DEFAULT_ICON_ALIAS, ...props }, ref) => {
      let alias: IconSizeAliases = DEFAULT_ICON_ALIAS;
      if (size !== alias && isAlias(size)) {
        alias = size;
      } else if (typeof size === 'number') {
        alias = getAliasFromSize(size);
      }
      const Icon = sizes[alias]();

      return React.cloneElement(Icon, { ref, ...props });
    },
  );
