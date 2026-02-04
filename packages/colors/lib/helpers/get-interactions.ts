import { clampChroma, converter, type Oklch } from 'culori';

import {
  HOVER_LIGHT_L,
  HOVER_LIGHT_C,
  HOVER_DARK_L,
  HOVER_DARK_C,
  PRESSED_LIGHT_L,
  PRESSED_LIGHT_C,
  PRESSED_DARK_L,
  PRESSED_DARK_C,
} from '../consts/params/interactions.js';

interface InteractionColors {
  light: string;
  dark: string;
}

function applyOklchDelta(oklchColor: Oklch, dL: number, dC: number): string {
  const { l = 0, c = 0, h = 0 } = oklchColor;

  const safeH = h === undefined || isNaN(h) ? 0 : h;

  const newL = Math.max(0, Math.min(1, l + dL / 100));
  const chromaMax = clampChroma({ mode: 'oklch', l: newL, c: 1, h: safeH }, 'oklch').c;
  const newC = Math.min(Math.max(0, c + dC), chromaMax);

  return `oklch(${(newL * 100).toFixed(1)}% ${newC.toFixed(3)} ${safeH.toFixed(1)})`;
}

export function getHover(hex: string): InteractionColors {
  const toOklch = converter('oklch');
  const oklchColor = toOklch(hex);

  if (!oklchColor) {
    return { light: hex, dark: hex };
  }

  const lightHoverColor = applyOklchDelta(oklchColor, HOVER_LIGHT_L, HOVER_LIGHT_C);

  const darkHoverColor = applyOklchDelta(oklchColor, HOVER_DARK_L, HOVER_DARK_C);

  return {
    light: lightHoverColor,
    dark: darkHoverColor,
  };
}

export function getPressed(hex: string): InteractionColors {
  const toOklch = converter('oklch');
  const oklchColor = toOklch(hex);

  if (!oklchColor) {
    return { light: hex, dark: hex };
  }

  const lightPressedColor = applyOklchDelta(oklchColor, PRESSED_LIGHT_L, PRESSED_LIGHT_C);

  const darkPressedColor = applyOklchDelta(oklchColor, PRESSED_DARK_L, PRESSED_DARK_C);

  return {
    light: lightPressedColor,
    dark: darkPressedColor,
  };
}
