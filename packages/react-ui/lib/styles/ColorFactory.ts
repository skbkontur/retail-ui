import warning from 'warning';

import { hasOwnProperty } from '../utils';

import { clamp, extractColorParts, hue2rgb, parseHSLParts, parseRGBParts } from './ColorHelpers';
import { ColorKeywords } from './ColorKeywords';
import { ColorKeywordsType, ColorObject, ColorType, RGBTuple } from './ColorObject';

interface ColorFactoryCacheType {
  [key: string]: ColorObject;
}

const RGB_REGEX =
  /rgb\(\s*(\d{1,3}(?:(?:\.\d+)?%)?)\s*,\s*(\d{1,3}(?:(?:\.\d+)?%)?)\s*,\s*(\d{1,3}(?:(?:\.\d+)?%)?)\s*\)/;
const RGBA_REGEX =
  /rgba\(\s*(\d{1,3}(?:(?:\.\d+)?%)?)\s*,\s*(\d{1,3}(?:(?:\.\d+)?%)?)\s*,\s*(\d{1,3}(?:(?:\.\d+)?%)?)\s*,\s*(0|0\.\d+|1|1\.0+|\d{1,3}(?:(?:\.\d+)?%))\s*\)/;
const HSL_REGEX =
  /hsl\(\s*(\d{1,3})\s*,\s*(0|0\.\d+|1|1\.0+|\d{1,3}(?:(?:\.\d+)?%))\s*,\s*(0|0\.\d+|1|1\.0+|\d{1,3}(?:(?:\.\d+)?%))\s*\)/;
const HSLA_REGEX =
  /hsla\(\s*(\d{1,3})\s*,\s*(0|0\.\d+|1|1\.0+|\d{1,3}(?:(?:\.\d+)?%))\s*,\s*(0|0\.\d+|1|1\.0+|\d{1,3}(?:(?:\.\d+)?%))\s*,\s*(0|0\.\d+|1|1\.0+|\d{1,3}(?:(?:\.\d+)?%))\s*\)/;
const HEX_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;

export class ColorFactory {
  public static create(input: string) {
    if (!this.cache[input]) {
      this.cache[input] = Object.freeze(this.instantiate(input));
    }

    return this.cache[input];
  }

  private static cache: ColorFactoryCacheType = Object.create(null);

  private static instantiate(input: string) {
    if (typeof input !== 'string') {
      warning(false, `Invalid type of input (${typeof input}), expected a string. Returning transparent color`);
      return new ColorObject([0, 0, 0], 1.0, 'transparent');
    }
    input = input.toLowerCase().trim();

    if (input === 'transparent') {
      return new ColorObject([0, 0, 0], 0, 'transparent');
    } else if (this.isKeyword(input)) {
      return this.fromKeyword(input);
    } else if (input.startsWith('rgb')) {
      const parts = extractColorParts(input, RGB_REGEX, RGBA_REGEX);
      let { r, g, b, a } = parseRGBParts(parts);

      r = clamp(r, 255);
      g = clamp(g, 255);
      b = clamp(b, 255);
      a = clamp(a, 1);

      return this.fromRGB(r, g, b, a);
    } else if (input.startsWith('hsl')) {
      const parts = extractColorParts(input, HSL_REGEX, HSLA_REGEX);
      let { h, s, l, a } = parseHSLParts(parts);

      h = clamp(h, 360);
      s = clamp(s, 1);
      l = clamp(l, 1);
      a = clamp(a, 1);

      return this.fromHSL(h, s, l, a);
    }

    return this.fromHex(input);
  }

  private static isKeyword(input: string): input is ColorKeywordsType {
    return hasOwnProperty(ColorKeywords, input);
  }

  private static fromKeyword(keyword: ColorKeywordsType) {
    return this.fromHex(ColorKeywords[keyword], keyword);
  }

  private static fromHex(hexString: string, type: ColorType = 'hex') {
    if (!HEX_REGEX.test(hexString)) {
      throw new Error(`${hexString} is not a valid hex color string`);
    }

    const colorCode = hexString.substring(1);
    const rgb: RGBTuple = [0, 0, 0];
    if (colorCode.length === 6) {
      colorCode.match(/.{2}/g)!.forEach((c, i) => {
        rgb[i] = parseInt(c, 16);
      });
    } else if (colorCode.length === 3) {
      colorCode.split('').forEach((c, i) => {
        rgb[i] = parseInt(c + c, 16);
      });
    }
    return new ColorObject(rgb, 1.0, type);
  }

  private static fromRGB(r: number, g: number, b: number, a = 1.0) {
    return new ColorObject([r, g, b], a, a < 1 ? 'rgba' : 'rgb');
  }

  private static fromHSL(h: number, s: number, l: number, a = 1.0) {
    if (s === 0) {
      const gray = Math.round(l * 255);
      return new ColorObject([gray, gray, gray], a, a < 1 ? 'hsla' : 'hsl');
    }

    const hDeg = h / 360;
    const t1 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const t2 = l * 2 - t1;

    const r = hue2rgb(hDeg + 1 / 3, t1, t2);
    const g = hue2rgb(hDeg, t1, t2);
    const b = hue2rgb(hDeg - 1 / 3, t1, t2);

    const rgb: RGBTuple = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    return new ColorObject(rgb, a, a < 1 ? 'hsla' : 'hsl');
  }
}
