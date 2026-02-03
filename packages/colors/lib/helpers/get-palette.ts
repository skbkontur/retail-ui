import { clampChroma, converter } from 'culori';

import type {
  GeneratorColorAbneyCorrection,
  GeneratorColorChromaParamsGroup,
  GeneratorColorPalette,
  GeneratorColorWarningHuePatch,
} from '../types/tokens-base-generator.js';
import { CHROMA_PARAMS } from '../consts/params/chroma-params.js';
import { ABNEY_CORRECTION } from '../consts/params/abney-correction.js';
import { PROMO_HUE_SHIFTS } from '../consts/params/promo-hue-shift.js';
import { WARNING_HUE_PATCH } from '../consts/params/warning-hue-patch.js';

const toOklch = converter('oklch');

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
  const baseHue = calcBaseHue(color, settings.abneyCorrection);
  const correctionHueRange = calcCorrectionRange(color, settings.abneyCorrection);

  for (const Lstr in settings.chromaSettings) {
    const L = +Lstr;
    if (L === 100) {
      result.vivid[L] = `oklch(100% 0 0)`;
      result.normal[L] = `oklch(100% 0 0)`;
      result.dim[L] = `oklch(100% 0 0)`;
      continue;
    }

    let hue = baseHue;
    const lightnessCorrectionData = settings.abneyCorrection[L];
    if (lightnessCorrectionData && correctionHueRange !== undefined) {
      const shift = lightnessCorrectionData[correctionHueRange] ?? 0;
      hue = (baseHue + shift + 360) % 360;
    }

    if (isWarning) {
      hue = calcWarningHuePatch(hue, L, settings.warningHuePatch);
    }

    const chromaMax = clampChroma({ mode: 'oklch', l: L / 100, c: 1, h: hue }, 'oklch').c;
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

    result.vivid[L] = `oklch(${L}% ${vividN.toFixed(3)} ${hue.toFixed(0)})`;
    result.normal[L] = `oklch(${L}% ${normN.toFixed(3)} ${hue.toFixed(0)})`;
    result.dim[L] = `oklch(${L}% ${dimN.toFixed(3)} ${hue.toFixed(0)})`;
  }

  return result;
}

export function calcWarningHuePatch(
  currentHue: number,
  lightness: number,
  warningHuePatchData: GeneratorColorWarningHuePatch
): number {
  const patch = warningHuePatchData[lightness];
  if (patch !== undefined) {
    return (currentHue + patch + 360) % 360;
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

export function calcBaseHue(inputColorString: string, abneyData: GeneratorColorAbneyCorrection): number {
  const colorOKLCH = toOklch(inputColorString) as { l: number; c: number; h: number };
  const targetLightness = colorOKLCH.l * 100;
  const targetHue = colorOKLCH.h;
  const availableLightnessSteps = Object.keys(abneyData).map(Number);
  const closestLightness = findClosestLightnessStep(targetLightness, availableLightnessSteps);
  const lightnessCorrectionData = abneyData[closestLightness];
  const correctedHueMap = Object.entries(lightnessCorrectionData).map(([rawHueStr, shift]) => {
    const rawHue = Number(rawHueStr);
    return {
      rawHue,
      shift,
      correctedHue: (rawHue + shift + 360) % 360,
    };
  });

  correctedHueMap.sort((a, b) => a.correctedHue - b.correctedHue);
  if (correctedHueMap.length === 0) {
    return targetHue;
  }

  let selectedRange = correctedHueMap[correctedHueMap.length - 1];
  for (let i = 0; i < correctedHueMap.length; i++) {
    const current = correctedHueMap[i];
    const next = correctedHueMap[i + 1];

    if (!next) {
      selectedRange = current;
      break;
    }

    if (targetHue >= current.correctedHue && targetHue < next.correctedHue) {
      selectedRange = current;
      break;
    }
  }

  return (targetHue - selectedRange.shift + 360) % 360;
}

export function calcCorrectionRange(inputColorString: string, abneyData: GeneratorColorAbneyCorrection): number {
  const colorOKLCH = toOklch(inputColorString) as { l: number; c: number; h: number };
  const targetLightness = colorOKLCH.l * 100;
  const targetHue = colorOKLCH.h;
  const availableLightnessSteps = Object.keys(abneyData).map(Number);
  const closestLightness = findClosestLightnessStep(targetLightness, availableLightnessSteps);
  const lightnessCorrectionData = abneyData[closestLightness];
  const correctedHueMap = Object.entries(lightnessCorrectionData).map(([rawHueStr, shift]) => {
    const rawHue = Number(rawHueStr);
    return {
      rawHue,
      shift,
      correctedHue: (rawHue + shift + 360) % 360,
    };
  });

  correctedHueMap.sort((a, b) => a.correctedHue - b.correctedHue);

  let selectedRange = correctedHueMap[correctedHueMap.length - 1];
  for (let i = 0; i < correctedHueMap.length; i++) {
    const current = correctedHueMap[i];
    const next = correctedHueMap[i + 1];

    if (targetHue >= current.correctedHue && targetHue < next.correctedHue) {
      selectedRange = current;
      break;
    }
  }

  return selectedRange.rawHue;
}
