import type { getColorsDefaultTokens } from '../get-colors-default-tokens.js';

export type ThemeKey = 'light' | 'dark';

export interface Themed<T> extends Record<ThemeKey, T> {
  light: T;
  dark: T;
}

export interface ColorObject {
  [key: string]: ColorValue;
}

export type ColorValue = string | ColorObject | ColorValue[];

export type ColorStructure = ColorObject | ColorValue[];

export type DefaultTokensFull = ReturnType<typeof getColorsDefaultTokens>;

export type DefaultTokens = DefaultTokensFull[ThemeKey];
