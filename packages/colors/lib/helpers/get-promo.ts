import { converter, clampChroma, type Oklch } from 'culori';

import {
  PROMO_CHROMA_MAX,
  PROMO_CHROMA_MIN,
  PROMO_CHROMA_RELATIVE,
  PROMO_HUE_SHIFTS,
  PROMO_LIGHTNESS_SHIFTS,
} from '../consts/params/promo-params.js';

const toOklch = converter('oklch');

export function getPromo(
  inputColor: string,
  hueShifts = PROMO_HUE_SHIFTS,
  lightnessShifts = PROMO_LIGHTNESS_SHIFTS
): string {
  const color = toOklch(inputColor) as Oklch;
  const hue = (((color.h || 0) % 360) + 360) % 360;
  const hueShift = hueShifts.find((r) => hue >= r.min && hue <= r.max)?.shift || 0;
  color.h = (hue + hueShift + 360) % 360;

  const lightness = color.l * 100;
  const lightnessShift = lightnessShifts.find((r) => lightness >= r.min && lightness <= r.max)?.shift || 0;
  color.l = Math.max(0, Math.min(100, lightness + lightnessShift)) / 100;

  const chromaMaxAvailable = clampChroma({ ...color, c: 1 }, 'oklch').c;
  const chromeRelative = chromaMaxAvailable * PROMO_CHROMA_RELATIVE;
  color.c = Math.min(chromaMaxAvailable, Math.max(PROMO_CHROMA_MIN, Math.min(PROMO_CHROMA_MAX, chromeRelative)));

  return `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`;
}
