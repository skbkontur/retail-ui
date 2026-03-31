import { getColorsDefaultTokens } from './get-colors-default-tokens.js';
import { type ConfigOptions, type PresetOrCustom, getColorsBase } from './get-colors-base.js';
import type { TokensBase } from './types/tokens-base.js';
import { convertColorFormat, type ColorFormat } from './utils/convert-color.js';
import type { DefaultTokens, DefaultTokensFull, Themed, ThemeKey } from './types/tokens.js';
import type * as DEFAULT_SWATCH from './consts/default-swatch.js';
import { generateCSSStyles } from './utils/create-styles.js';

export interface SemanticConfigOptions<T> extends ConfigOptions {
  /** Брендовый цвет из палитры или кастомная строка */
  brand: PresetOrCustom<keyof typeof DEFAULT_SWATCH.brand>;
  /**
   * Акцентный цвет.
   * `brand` — совпадает с брендовым, `gray` — в оттенках серого
   */
  accent: PresetOrCustom<'brand' | 'gray'>;
  /**
   * Возвращать токены для конкретной темы или для всех сразу
   */
  theme: ThemeKey | 'all';
  /** Объект с образцами цветов warning, error, success */
  system?: typeof DEFAULT_SWATCH.system;
  /**
   * Формат выгрузки токенов
   * @default 'hex/rgba'
   */
  format?: ColorFormat;
  /**
   * Формат возвращаемых данных
   * @default 'object'
   */
  output?: 'object' | 'css';
  /**
   * Кастомные селекторы для генерируемого CSS через `output: 'css'`.
   * Поддерживают плейсхолдеры $brand, $accent, $theme.
   * @default {
   * light: "[data-k-brand='$brand'][data-k-accent='$accent']",
   * dark: "[data-k-brand='$brand'][data-k-accent='$accent'][data-k-theme='$theme']"
   * }
   */
  outputSelectors?: {
    light?: string;
    dark?: string;
  };
  /**
   * Колбэк для формирования кастомного списка семантических токенов
   * @param base Ссылки на базовые токены
   * @param defaults Токены по умолчанию
   * @param params Параметры переданные в getColors
   */
  overrides?: (base?: TokensBase, defaults?: DefaultTokensFull, params?: SemanticConfigOptions<T>) => Themed<T>;
}

const defaultSelectors = {
  light: "[data-k-brand='$brand'][data-k-accent='$accent']",
  dark: "[data-k-brand='$brand'][data-k-accent='$accent'][data-k-theme='$theme']",
};

/**
 * Получение списка семантических токенов в виде объекта
 *
 * @param {SemanticConfigOptions<T>} params - Конфигурация генерации
 * @returns {DefaultTokens} Список токенов
 */
export function getColors<T>(params: SemanticConfigOptions<T> & { output?: 'object' }): DefaultTokens;

/**
 * Получение списка семантических токенов в виде CSS-строки
 *
 * @param {SemanticConfigOptions<T>} params - Конфигурация генерации с output: 'css'
 * @returns {string} CSS-строка
 */
export function getColors<T>(params: SemanticConfigOptions<T> & { output: 'css' }): string;

export function getColors<T>(params: SemanticConfigOptions<T>): DefaultTokens | string {
  let base;

  // Convert hex-aarrggbb via hex/rgba
  if (params.format === 'hex-aarrggbb') {
    base = getColorsBase({ ...params, format: 'hex/rgba' });
  } else {
    base = getColorsBase(params);
  }

  const defaults = getColorsDefaultTokens(base);

  let result: any;

  if (params.overrides) {
    result = params.overrides(base, defaults, params);
  } else {
    result = defaults;
  }

  if (params.format) {
    result = convertColorFormat(result, params.format);
  }

  if (params.output === 'css') {
    const { theme } = params;
    const cssParams = {
      ...params,
      outputSelectors: {
        ...defaultSelectors,
        ...params.outputSelectors,
      },
    };

    if (theme === 'all') {
      const lightStyles = generateCSSStyles(result.light, { ...cssParams, theme: 'light' });
      const darkStyles = generateCSSStyles(result.dark, { ...cssParams, theme: 'dark' });
      return `${lightStyles}\n\n${darkStyles}`;
    }
    return generateCSSStyles(result[theme], { ...cssParams, theme });
  }

  if (params.theme === 'all') {
    return result;
  }

  return result[params.theme];
}
