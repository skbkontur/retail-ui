export interface TokensBase {
  brand: {
    logo: ThemedValue;
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
  gray: ColorWithScale<GrayScale>;
  whiteAlpha: ColorWithScale<AlphaScale>;
  blackAlpha: ColorWithScale<AlphaScale>;
  onBrand: ColorWithScale<AlphaScale>;
  onAccent?: ColorWithScale<AlphaScale>;
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

type AlphaScale =
  | 4
  | 6
  | 8
  | 12
  | 16
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
  | 96
  | 100;

export type GrayScale =
  | 0
  | 16
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
  | 96
  | 98
  | 100;

type ColorWithScale<T extends string | number> = {
  [K in T]: string;
};

export interface ThemedValue {
  light: string;
  dark: string;
}
