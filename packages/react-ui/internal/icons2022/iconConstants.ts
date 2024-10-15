export const ALIASES_TO_SIZES = {
  small: 16,
  medium: 20,
  large: 24,
} as const;

export type IconSizeAliases = keyof typeof ALIASES_TO_SIZES;

export const DEFAULT_ICON_ALIAS: IconSizeAliases = 'small';

export const DEFAULT_ICON_SIZE: (typeof ALIASES_TO_SIZES)[IconSizeAliases] = 16;
