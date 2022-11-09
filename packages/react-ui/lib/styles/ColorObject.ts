import warning from 'warning';

import { clamp, roundToPrecision } from './ColorHelpers';
import { ColorKeywords } from './ColorKeywords';

export type RGBTuple = [number, number, number];
export type ColorKeywordsType = keyof typeof ColorKeywords;
export type ColorType = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'transparent' | ColorKeywordsType;

interface ColorHSLA {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface ColorRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorObjectType {
  rgb: RGBTuple;
  alpha: number;
  type: ColorType;
  luma(): number;
  toRGB(): ColorRGBA;
  toHSL(): ColorHSLA;
  toHEXString(): string;
  toRGBString(): string;
  toHSLString(): string;
}

export class ColorObject implements ColorObjectType {
  public rgb: RGBTuple;
  public alpha: number;
  public type: ColorType;

  constructor(rgb: RGBTuple, alpha: number, type: ColorType) {
    this.rgb = rgb;
    this.alpha = alpha;
    this.type = type;
  }

  public luma() {
    let r = this.rgb[0] / 255;
    let g = this.rgb[1] / 255;
    let b = this.rgb[2] / 255;

    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  public toHEXString() {
    warning(this.alpha === 1, `There is an alpha channel=${this.alpha}, converting to HEX will discard opacity`);

    return (
      '#' +
      this.rgb
        .map((c) => {
          const clamped = clamp(Math.round(c), 255);

          return (clamped < 16 ? '0' : '') + clamped.toString(16);
        })
        .join('')
    );
  }

  public toRGB() {
    return { r: this.rgb[0], g: this.rgb[1], b: this.rgb[2], a: this.alpha };
  }

  public toRGBString() {
    return this.alpha < 1
      ? `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${this.alpha})`
      : `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
  }

  public toHSL() {
    const r = this.rgb[0] / 255;
    const g = this.rgb[1] / 255;
    const b = this.rgb[2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let hDeg = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          hDeg = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          hDeg = (b - r) / d + 2;
          break;
        case b:
          hDeg = (r - g) / d + 4;
          break;
      }
      hDeg = Math.round(hDeg * 60);
    }

    return {
      h: hDeg,
      s: roundToPrecision(s, 2),
      l: roundToPrecision(l, 2),
      a: this.alpha,
    };
  }

  public toHSLString() {
    const hsl = this.toHSL();
    return hsl.a < 1
      ? `hsla(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%, ${hsl.a})`
      : `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`;
  }

  public toColorString(type: ColorType = this.type) {
    switch (type) {
      case 'rgb':
      case 'rgba': {
        return this.toRGBString();
      }
      case 'hsl':
      case 'hsla': {
        return this.toHSLString();
      }
      case 'transparent': {
        return `transparent`;
      }
      default:
        return this.toHEXString();
    }
  }

  public clone() {
    const { rgb, alpha, type } = this;
    return new ColorObject(rgb, alpha, type);
  }
}
