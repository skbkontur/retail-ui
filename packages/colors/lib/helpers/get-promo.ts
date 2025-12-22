import { clampChroma, converter, formatHex, type Oklch } from 'culori';

import { PROMO_HUE_SHIFTS } from '../consts/params/promo-hue-shift.js';

export function getPromo(color: string, hueShifts = PROMO_HUE_SHIFTS): string {
  const toOklch = converter('oklch');
  const oklchColor = toOklch(color) as Oklch;
  if (!oklchColor) {
    throw new Error(`Invalid color string: ${color}`);
  }

  const currentHue = oklchColor.h as number;
  const promoHueShift = getPromoHueShift(currentHue, hueShifts);
  const correctedHue = (currentHue + promoHueShift + 360) % 360;

  let promoLightness = oklchColor.l * 100;
  if (promoLightness >= 50) {
    promoLightness = promoLightness - 32;
  }
  promoLightness = Math.min(Math.max(promoLightness, 30), 34);

  const promoChroma = 0.1;

  const finalLightness = Math.round(promoLightness) / 100;
  const finalChroma = Math.round(promoChroma * 100) / 100;

  const promoOklch: Oklch = {
    mode: 'oklch',
    l: finalLightness,
    c: finalChroma,
    h: correctedHue,
  };

  return formatHex(clampChroma(promoOklch, 'oklch'));
}

export function getPromoHueShift(currentHue: number, promoHueShifts: { [hueRange: number]: number }): number {
  const hueRanges = Object.keys(promoHueShifts)
    .map(Number)
    .sort((a, b) => a - b);
  let selectedHueRange = hueRanges[0];
  for (let i = 0; i < hueRanges.length; i++) {
    const startRange = hueRanges[i];
    const endRange = hueRanges[i + 1] !== undefined ? hueRanges[i + 1] : 360;
    if (currentHue >= startRange && currentHue < endRange) {
      selectedHueRange = startRange;
      break;
    }
    if (i === hueRanges.length - 1 && (currentHue >= startRange || currentHue < hueRanges[0])) {
      selectedHueRange = startRange;
      break;
    }
  }
  return promoHueShifts[selectedHueRange] !== undefined ? promoHueShifts[selectedHueRange] : 0;
}
