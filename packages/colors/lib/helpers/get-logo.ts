import { clampChroma, converter, type Oklch } from 'culori';

import { logoKontur, neutralSolid } from '../consts/default-swatch.js';
import { LOGO_LIGHTNESS_MIN } from '../consts/params/logo-lightness.js';
import { formatOklch } from '../utils/convert-color.js';

const toOklch = converter('oklch');

interface LogoColors {
  light: string;
  dark: string;
}

export function getLogoKontur() {
  return {
    light: logoKontur,
    dark: neutralSolid[100],
  };
}

export function getLogoProduct(color: string): LogoColors {
  const darkColor = toOklch(color) as Oklch;

  if (darkColor.l >= LOGO_LIGHTNESS_MIN) {
    return {
      light: color,
      dark: color,
    };
  }

  darkColor.l = LOGO_LIGHTNESS_MIN;
  const chromaMaxAvailable = clampChroma({ ...darkColor, c: 1 }, 'oklch').c;
  const chromaResult = Math.min(chromaMaxAvailable, darkColor.c);

  return {
    light: color,
    dark: formatOklch({ l: darkColor.l, c: chromaResult, h: darkColor.h }),
  };
}
