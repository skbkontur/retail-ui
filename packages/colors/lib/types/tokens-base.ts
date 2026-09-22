import type { neutralBlackAlpha, neutralSolid, neutralWhiteAlpha } from '../consts/default-swatch.js';

export interface TokensBase {
  brand: {
    logoKontur: ThemedValue;
    logoProduct: ThemedValue;
    original: string;
    promo: string;
    interactions: {
      hover: ThemedValue;
      pressed: ThemedValue;
    };
    palette: ColorPalette;
  };
  accent?: {
    original: ThemedValue;
    interactions: {
      hover: ThemedValue;
      pressed: ThemedValue;
    };
    palette?: ColorPalette;
  };
  warning: ColorPalette;
  error: ColorPalette;
  success: ColorPalette;
  neutralSolid: ColorWithScale<NeutralSolidScale>;
  neutralWhiteAlpha: ColorWithScale<NeutralWhiteAlphaScale>;
  neutralBlackAlpha: ColorWithScale<NeutralBlackAlphaScale>;
  onBrand: ColorWithScale<OnBrandScale>;
  onAccent?: ColorWithScale<OnAccentScale>;
  customizable: {
    red: ColorPalette;
    orange: ColorPalette;
    green: ColorPalette;
    mint: ColorPalette;
    blue: ColorPalette;
    blueDeep: ColorPalette;
    violet: ColorPalette;
    purple: ColorPalette;
    yellow: ColorPalette;
  };
}

export interface ColorPalette {
  vivid: ColorWithScale<ChromaScale>;
  normal: ColorWithScale<ChromaScale>;
  dim: ColorWithScale<ChromaScale>;
}

export type ChromaScale =
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 68
  | 72
  | 76
  | 80
  | 84
  | 88
  | 92
  | 96;

type NeutralWhiteAlphaScale = keyof typeof neutralWhiteAlpha;

type NeutralBlackAlphaScale = keyof typeof neutralBlackAlpha;

type NeutralSolidScale = keyof typeof neutralSolid;

type OnBrandScale = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 65 | 70 | 75 | 80 | 90 | 95 | 100;
type OnAccentScale = OnBrandScale;

type ColorWithScale<T extends string | number> = {
  [K in T]: string;
};

export interface ThemedValue {
  light: string;
  dark: string;
}
