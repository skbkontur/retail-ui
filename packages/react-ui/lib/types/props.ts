import type { ReactElement } from 'react';

export type SizeProp = 'small' | 'medium' | 'large';

interface IconProps {
  size: number;
  color: string;
}

export function hasIconProps(icon: ReactElement): icon is ReactElement<IconProps> {
  const hasIcon = !!icon && !!icon.props && typeof icon.props === 'object' && 'size' in icon.props;
  const hasColor = !!icon && !!icon.props && typeof icon.props === 'object' && 'color' in icon.props;
  return hasColor && hasIcon;
}
