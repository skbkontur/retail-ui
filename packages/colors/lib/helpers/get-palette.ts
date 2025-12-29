import { clampChroma, converter } from 'culori';
import { calcAPCA } from 'apca-w3';

import type {
  GeneratorColorAbneyCorrection,
  GeneratorColorChromaParamsGroup,
  GeneratorColorPalette,
  GeneratorColorWarningHuePatch,
} from '../types/tokens-base-generator.js';
import * as DefaultSwatch from '../consts/default-swatch.js';
import { CHROMA_PARAMS } from '../consts/params/chroma-params.js';
import { ABNEY_CORRECTION } from '../consts/params/abney-correction.js';
import { PROMO_HUE_SHIFTS } from '../consts/params/promo-hue-shift.js';
import { WARNING_HUE_PATCH } from '../consts/params/warning-hue-patch.js';

interface GeneratePaletteParams {
  color: string;
  type?: 'default' | 'warning';
  settings?: {
    chromaSettings?: GeneratorColorChromaParamsGroup;
    abneyCorrection?: GeneratorColorAbneyCorrection;
    promoHueShifts?: { [hueRange: number]: number };
    warningHuePatch?: GeneratorColorWarningHuePatch;
  };
}

export function getPalette({
  color,
  type = 'default',
  settings: customSettings,
}: GeneratePaletteParams): GeneratorColorPalette {
  const defaultSettings = {
    chromaSettings: CHROMA_PARAMS,
    abneyCorrection: ABNEY_CORRECTION,
    promoHueShifts: PROMO_HUE_SHIFTS,
    warningHuePatch: WARNING_HUE_PATCH,
  };

  const settings = {
    ...defaultSettings,
    ...customSettings,
  };

  const toOklch = converter('oklch');
  const oklchColor = toOklch(color);
  const currentHue = oklchColor?.h || 0;

  const toNorm = (x: number) => x / 100;

  const calculateChromaValue = (
    rel: number,
    min: number | undefined,
    max: number | undefined,
    baseChromaMax: number
  ) => {
    const raw = (baseChromaMax * rel) / 100;
    let value = raw;
    if (min !== undefined) {
      value = Math.max(toNorm(min), value);
    }
    if (max !== undefined) {
      value = Math.min(toNorm(max), value);
    }
    return Math.min(value, baseChromaMax);
  };

  const result: GeneratorColorPalette = {
    vivid: {},
    normal: {},
    dim: {},
  };
  const isWarning = type === 'warning';

  for (const Lstr in settings.chromaSettings) {
    const L = +Lstr;
    if (L === 100) {
      result.vivid[L] = `oklch(100% 0 0)`;
      result.normal[L] = `oklch(100% 0 0)`;
      result.dim[L] = `oklch(100% 0 0)`;
      continue;
    }

    const hueAfterWarningPatch = applyWarningHuePatch(currentHue, L, settings.warningHuePatch, isWarning);
    const appliedHueShift = applyAbneyShift(L, hueAfterWarningPatch, settings.abneyCorrection);

    const chromaMax = clampChroma({ mode: 'oklch', l: L / 100, c: 1, h: appliedHueShift }, 'oklch').c;
    const currentParams = settings.chromaSettings[L];

    const vividN = calculateChromaValue(
      currentParams.vivid.rel,
      currentParams.vivid.min,
      currentParams.vivid.max,
      chromaMax
    );
    const normN = calculateChromaValue(
      currentParams.normal.rel,
      currentParams.normal.min,
      currentParams.normal.max,
      chromaMax
    );
    const dimN = calculateChromaValue(currentParams.dim.rel, currentParams.dim.min, currentParams.dim.max, chromaMax);

    result.vivid[L] = `oklch(${L}% ${vividN.toFixed(3)} ${appliedHueShift.toFixed(0)})`;
    result.normal[L] = `oklch(${L}% ${normN.toFixed(3)} ${appliedHueShift.toFixed(0)})`;
    result.dim[L] = `oklch(${L}% ${dimN.toFixed(3)} ${appliedHueShift.toFixed(0)})`;
  }

  return result;
}

export function getAbneyHueShift(
  lightness: number,
  currentHue: number,
  abneyData: GeneratorColorAbneyCorrection
): number {
  const lightnessData = abneyData[lightness];
  if (!lightnessData) {
    return 0;
  }
  const hueRanges = Object.keys(lightnessData)
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
    if (i === hueRanges.length - 1 && currentHue >= startRange && currentHue < 360) {
      selectedHueRange = startRange;
      break;
    }
  }
  return lightnessData[selectedHueRange] !== undefined ? lightnessData[selectedHueRange] : 0;
}

export function applyAbneyShift(
  lightness: number,
  currentHue: number,
  abneyData: GeneratorColorAbneyCorrection
): number {
  const abneyShift = getAbneyHueShift(lightness, currentHue, abneyData);
  return (currentHue + abneyShift + 360) % 360;
}

export function applyWarningHuePatch(
  currentHue: number,
  lightness: number,
  warningHuePatchData: GeneratorColorWarningHuePatch,
  isWarningMode: boolean
): number {
  if (isWarningMode) {
    const patch = warningHuePatchData[lightness];
    if (patch !== undefined) {
      return (currentHue + patch + 360) % 360;
    }
  }
  return currentHue;
}

function findClosestLightnessStep(targetL: number, availableLightnessSteps: number[]): number {
  if (availableLightnessSteps.length === 0) {
    return targetL;
  }
  const sortedSteps = [...availableLightnessSteps].sort((a, b) => a - b);
  let closestStep = sortedSteps[0];
  let minDiff = Math.abs(targetL - closestStep);
  for (let i = 1; i < sortedSteps.length; i++) {
    const currentStep = sortedSteps[i];
    const diff = Math.abs(targetL - currentStep);
    if (diff < minDiff || (diff === minDiff && currentStep > closestStep)) {
      minDiff = diff;
      closestStep = currentStep;
    }
  }
  return closestStep;
}

export function calculateBaseHueAndCorrectionRange(
  inputColorString: string,
  abneyData: GeneratorColorAbneyCorrection
): {
  baseHue: number;
  correctionLightness: number;
  correctionHueRange: number;
} | null {
  const toOklch = converter('oklch');
  const oklch = toOklch(inputColorString) as { l: number; c: number; h: number };
  if (!oklch) {
    console.warn(`Could not parse color string: ${inputColorString}`);
    return null;
  }
  const targetLightness = Math.round(oklch.l * 100);
  let targetHue = oklch.h;
  if (isNaN(targetHue)) {
    console.warn(`Achromatic color detected (${inputColorString}). Defaulting hue to 0.`);
    targetHue = 0;
  }
  const availableLightnessSteps = Object.keys(abneyData).map(Number);
  if (availableLightnessSteps.length === 0) {
    console.warn('Abney correction data is empty, cannot calculate base hue.');
    return null;
  }
  const closestLightness = findClosestLightnessStep(targetLightness, availableLightnessSteps);
  const lightnessCorrectionData = abneyData[closestLightness];
  if (!lightnessCorrectionData) {
    console.warn(`No Abney correction data for lightness ${closestLightness}.`);
    return null;
  }
  const correctedHueMap = Object.entries(lightnessCorrectionData).map(([rawHueStr, shift]) => {
    const rawHue = Number(rawHueStr);
    return {
      rawHue,
      shift,
      correctedHue: (rawHue + shift + 360) % 360,
    };
  });
  correctedHueMap.sort((a, b) => {
    if (a.correctedHue !== b.correctedHue) {
      return a.correctedHue - b.correctedHue;
    }
    return a.rawHue - b.rawHue;
  });
  if (correctedHueMap.length === 0) {
    console.warn(`No hue ranges defined for lightness ${closestLightness}.`);
    return null;
  }
  const findCorrectRange = () => {
    const nextRangeIndex = correctedHueMap.findIndex((range) => range.correctedHue > targetHue);
    if (nextRangeIndex === 0) {
      return correctedHueMap[correctedHueMap.length - 1];
    }
    if (nextRangeIndex > 0) {
      return correctedHueMap[nextRangeIndex - 1];
    }
    return correctedHueMap[correctedHueMap.length - 1];
  };
  const selectedRange = findCorrectRange();
  if (!selectedRange) {
    console.error('Could not determine the correct hue range.');
    return null;
  }
  const baseHue = (targetHue - selectedRange.shift + 360) % 360;
  return {
    baseHue,
    correctionLightness: closestLightness,
    correctionHueRange: selectedRange.rawHue,
  };
}

export function calcOnBrand(hex: string): typeof DefaultSwatch.whiteAlpha {
  const whiteContrast = Math.abs(Number(calcAPCA('#fff', hex)));
  const blackContrast = Math.abs(Number(calcAPCA('#000', hex)));

  if (whiteContrast + 10 >= blackContrast) {
    return DefaultSwatch.whiteAlpha;
  }
  return DefaultSwatch.blackAlpha;
}
