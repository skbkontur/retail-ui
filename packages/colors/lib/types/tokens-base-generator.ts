export interface GeneratorColorChromaParamsGroup {
  [key: number]: {
    vivid: GeneratorColorChromaSettings;
    normal: GeneratorColorChromaSettings;
    dim: GeneratorColorChromaSettings;
  };
}

export interface GeneratorColorChromaSettings {
  rel: number;
  min?: number;
  max?: number;
}

export interface GeneratorColorPalette {
  vivid: { [key: number]: string };
  normal: { [key: number]: string };
  dim: { [key: number]: string };
}

export interface GeneratorColorAbneyCorrection {
  [lightness: number]: { [hueShiftRange: number]: number };
}

export interface GeneratorColorWarningHuePatch {
  [lightness: number]: number;
}

export interface GeneratorPaletteParams {
  color: string;
  type?: 'default' | 'warning' | 'promo';
  settings?: {
    chromaSettings?: GeneratorColorChromaParamsGroup;
    abneyCorrection?: GeneratorColorAbneyCorrection;
    promoHueShifts?: { [hueRange: number]: number };
    warningHuePatch?: GeneratorColorWarningHuePatch;
  };
}
