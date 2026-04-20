import { ACCENT_ATTR, BRAND_ATTR, CSS_PREFIX, THEME_ATTR } from '../consts/css-attributes.js';
import * as DEFAULT_SWATCH from '../consts/default-swatch.js';
import type { SemanticConfigOptions } from '../get-colors.js';
import type { ThemeKey } from '../types/tokens.js';
import { camelCaseToKebabCase } from './format-variable.js';

/**
 * Формирует CSS-селектор, подставляя $brand, $accent, $theme
 */
function createSelector<T>(params: SemanticConfigOptions<T>, brand: string, accent: string, theme: ThemeKey): string {
  const template = params.outputSelectors?.[theme] || params.outputSelectors?.light || '';

  if (template) {
    return template
      .replace(/\$brand/g, brand)
      .replace(/\$accent/g, accent)
      .replace(/\$theme/g, theme);
  }

  const baseSelector = `[${BRAND_ATTR}='${brand}'][${ACCENT_ATTR}='${accent}']`;
  const themeSuffix = theme === 'dark' ? `[${THEME_ATTR}='${theme}']` : '';

  return `${baseSelector}${themeSuffix}`;
}

/**
 * Генерация CSS-стилей [selector] { --variables: ... }
 */
export function generateCSSStyles<T>(themeTokens: any, params: SemanticConfigOptions<T> & { theme: ThemeKey }): string {
  const brand =
    params.brand in DEFAULT_SWATCH.brand ? camelCaseToKebabCase(params.brand as string) : params.brand.toLowerCase();

  const accent = params.accent.toLowerCase();
  const theme = params.theme;

  const selector = createSelector(params, brand, accent, theme);

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
  return Object.keys(obj).reduce(
    (acc, key) => {
      const newKey = prefix + (prefix ? '-' : '') + key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenHybridCase(obj[key], newKey));
      } else {
        // @ts-ignore
        acc[newKey] = obj[key];
      }
      return acc;
    },
    {} as Record<string, string>
  );
}
