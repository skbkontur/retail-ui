import { getPalette } from './helpers/get-palette.js';
import { getHover, getPressed } from './helpers/get-interactions.js';
import { getLogo } from './helpers/get-logo.js';
import { getPromo } from './helpers/get-promo.js';
import { type ColorFormat, convertColorFormat } from './utils/convert-color.js';
import { type ColorStructure } from './types/tokens.js';
import * as DEFAULT_SWATCH from './consts/default-swatch.js';
import type { TokensBase, ColorPalette } from './types/tokens-base.js';
import { getOnBrand } from './helpers/get-on-brand.js';

export type PresetOrCustom<T extends string> = T | (string & Record<never, never>);

export interface ConfigOptions {
  brand: PresetOrCustom<keyof typeof DEFAULT_SWATCH.brand>;
  accent: PresetOrCustom<'brand' | 'gray'>;
  system?: typeof DEFAULT_SWATCH.system;
  format?: ColorFormat;
}

export function getColorsBase({
  brand,
  accent,
  system = DEFAULT_SWATCH.system,
  format = 'hex/rgba',
}: ConfigOptions): TokensBase {
  const isPresetColor = brand in DEFAULT_SWATCH.brand;
  let brandColor;
  if (isPresetColor) {
    brandColor = DEFAULT_SWATCH.brand[brand as keyof typeof DEFAULT_SWATCH.brand];
  } else {
    brandColor = brand;
  }

  let accentColor;
  if (accent === 'brand') {
    accentColor = brandColor;
  } else if (accent !== 'gray') {
    accentColor = accent;
  }

  const brandPalette = getPalette({ color: brandColor }) as ColorPalette;
  let accentPalette;
  if (accent === 'brand') {
    accentPalette = brandPalette;
  } else if (accent !== 'gray' && accentColor) {
    accentPalette = getPalette({ color: accentColor }) as ColorPalette;
  }

  const customizablePalettes: TokensBase['customizable'] = {} as TokensBase['customizable'];

  for (const colorKey in DEFAULT_SWATCH.customizable) {
    const key = colorKey as keyof TokensBase['customizable'];

    if (key === brand && isPresetColor) {
      customizablePalettes[key] = brandPalette;
      continue;
    }

    customizablePalettes[key] = getPalette({
      color: DEFAULT_SWATCH.customizable[key],
    }) as ColorPalette;
  }

  const result = {
    brand: {
      logo: getLogo(brandColor),
      promo: getPromo(brandColor),
      original: brandColor,
      interactions: {
        hover: getHover(brandColor),
        pressed: getPressed(brandColor),
      },
      palette: brandPalette,
    },
    accent: accentColor
      ? {
          original: {
            light: accentColor,
            dark: accentColor,
          },
          interactions: {
            hover: getHover(accentColor),
            pressed: getPressed(accentColor),
          },
          palette: accentPalette,
        }
      : undefined,
    warning: getPalette({ color: system.warning, type: 'warning' }) as ColorPalette,
    error: getPalette({ color: system.error }) as ColorPalette,
    success: getPalette({ color: system.success }) as ColorPalette,
    gray: DEFAULT_SWATCH.gray,
    whiteAlpha: DEFAULT_SWATCH.whiteAlpha,
    blackAlpha: DEFAULT_SWATCH.blackAlpha,
    onBrand: getOnBrand(brandColor),
    onAccent: accentColor ? getOnBrand(accentColor) : undefined,
    customizable: customizablePalettes,
  } as unknown as ColorStructure;

  return convertColorFormat(result, format) as unknown as TokensBase;
}
