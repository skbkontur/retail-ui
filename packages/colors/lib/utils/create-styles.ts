import { ACCENT_ATTR, BRAND_ATTR, CSS_PREFIX, THEME_ATTR } from '../consts/css-attributes.js';
import type { SemanticConfigOptions } from '../get-colors.js';
import * as DEFAULT_SWATCH from '../consts/default-swatch.js';

import { camelCaseToKebabCase } from './format-variable.js';

export function generateCSSStyles<T>(themeTokens: any, params: SemanticConfigOptions<T>): string {
  const brand =
    params.brand in DEFAULT_SWATCH.brand ? camelCaseToKebabCase(params.brand as string) : params.brand.toLowerCase();

  const accentSelectorValue = params.accent.toLowerCase();

  let selector = `[${BRAND_ATTR}='${brand}'][${ACCENT_ATTR}='${accentSelectorValue}']`;

  if (params.theme === 'dark') {
    selector += `[${THEME_ATTR}='dark']`;
  }

  const cssVariables = flattenToCssVars(themeTokens, CSS_PREFIX);
  return `${selector} {\n${cssVariables}\n}`;
}

export function flattenToCssVars(obj: any, prefix: string): string {
  const flattened = flattenHybridCase(obj);
  return Object.entries(flattened)
    .map(([key, value]) => `  --${prefix}-${camelCaseToKebabCase(key)}: ${value};`)
    .join('\n');
}

export function flattenHybridCase(obj: any, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix + (prefix ? '-' : '') + key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenHybridCase(obj[key], newKey));
    } else {
      // @ts-ignore
      acc[newKey] = obj[key];
    }
    return acc;
  }, {} as Record<string, string>);
}
