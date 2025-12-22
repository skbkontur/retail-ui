import { converter, type Oklch } from 'culori';

import { LOGO_LIGHTNESS_MIN } from '../consts/params/logo-lightness.js';

interface LogoColors {
  light: string;
  dark: string;
}

export function getLogo(hex: string): LogoColors {
  const toOklch = converter('oklch');
  const oklchColor = toOklch(hex) as Oklch | undefined;

  const lightThemeLogoColor = hex;

  if (!oklchColor) {
    const fallbackColor = `oklch(${LOGO_LIGHTNESS_MIN}% 0 0)`;
    return { light: hex, dark: fallbackColor };
  }

  let { l = 0, c = 0 } = oklchColor;
  const { h } = oklchColor;

  const safeH = h === undefined || isNaN(h) ? 0 : h;

  l = l || 0;
  c = c || 0;

  const percentL = l * 100;
  if (percentL < LOGO_LIGHTNESS_MIN) {
    l = LOGO_LIGHTNESS_MIN / 100;
  }

  const darkThemeLogoColor = `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${safeH.toFixed(0)})`;

  return {
    light: lightThemeLogoColor,
    dark: darkThemeLogoColor,
  };
}
