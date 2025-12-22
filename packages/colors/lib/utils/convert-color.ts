import { converter, formatHex, type Rgb } from 'culori';

import type { ColorObject, ColorStructure } from '../types/tokens.js';

export type ColorFormat = 'hex/rgba' | 'oklch' | 'hex-aarrggbb';

export function convertColorFormat(obj: ColorStructure, format: ColorFormat = 'hex/rgba'): ColorStructure {
  if (format === 'oklch') {
    return convertToOklchRecursive(obj);
  }

  let result = convertOklchToHex(obj);
  result = convertAlphaOklchToRgba(result);

  if (format === 'hex-aarrggbb') {
    return convertToAarrggbbRecursive(result);
  }

  return result;
}

function convertToOklchRecursive(obj: ColorStructure): ColorStructure {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertToOklchRecursive(item as ColorStructure));
  }

  const newObj: ColorObject = {};
  const toOklch = converter('oklch');

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      if (value.startsWith('oklch(')) {
        newObj[key] = value;
      } else {
        const color = toOklch(value);
        if (color) {
          const l = (color.l * 100).toFixed(3);
          const c = color.c.toFixed(3);
          const h = (color.h || 0).toFixed(0);
          const a = color.alpha !== undefined && color.alpha < 1 ? ` / ${color.alpha}` : '';
          newObj[key] = `oklch(${l}% ${c} ${h}${a})`;
        } else {
          newObj[key] = value;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = convertToOklchRecursive(value as ColorStructure) as any;
    } else {
      newObj[key] = value;
    }
  }
  return newObj as ColorStructure;
}

function convertOklchToHex(obj: ColorStructure): ColorStructure {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertOklchToHex(item as ColorStructure));
  }

  const newObj: ColorObject = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string' && value.startsWith('oklch(') && !value.includes('/')) {
      const oklchColor = converter('oklch')(value);
      newObj[key] = oklchColor ? formatHex(oklchColor) : value;
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = convertOklchToHex(value as ColorStructure) as any;
    } else {
      newObj[key] = value;
    }
  }
  return newObj as ColorStructure;
}

function convertAlphaOklchToRgba(obj: ColorStructure): ColorStructure {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertAlphaOklchToRgba(item as ColorStructure));
  }

  const newObj: ColorObject = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string' && value.startsWith('oklch(') && value.includes('/')) {
      const rgbaColor = converter('rgb')(value);
      if (rgbaColor) {
        const r = Math.round(rgbaColor.r * 255);
        const g = Math.round(rgbaColor.g * 255);
        const b = Math.round(rgbaColor.b * 255);
        const a = rgbaColor.alpha ?? 1;
        newObj[key] = `rgba(${r}, ${g}, ${b}, ${a})`;
        continue;
      }
    }

    if (typeof value === 'object' && value !== null) {
      newObj[key] = convertAlphaOklchToRgba(value as ColorStructure) as any;
    } else {
      newObj[key] = value;
    }
  }
  return newObj as ColorStructure;
}

const convertToAarrggbb = (colorString: string): string => {
  const color = converter('rgb')(colorString) as Rgb;
  if (!color) {
    return colorString;
  }

  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const alpha = Math.round((color.alpha ?? 1) * 255);

  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  const rgbHex = `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

  if (alpha === 255) {
    return `#${rgbHex}`;
  }

  return `#${toHex(alpha)}${rgbHex}`.toUpperCase();
};

function convertToAarrggbbRecursive(obj: ColorStructure): ColorStructure {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertToAarrggbbRecursive(item as ColorStructure));
  }

  const newObj: ColorObject = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      newObj[key] = convertToAarrggbb(value);
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = convertToAarrggbbRecursive(value as ColorStructure) as any;
    } else {
      newObj[key] = value;
    }
  }
  return newObj as ColorStructure;
}
