import { getColorsDefaultTokens } from './get-colors-default-tokens.js';
import { type ConfigOptions, type PresetOrCustom, getColorsBase } from './get-colors-base.js';
import type { TokensBase } from './types/tokens-base.js';
import { convertColorFormat, type ColorFormat } from './utils/convert-color.js';
import type { DefaultTokens, DefaultTokensFull, Themed } from './types/tokens.js';
import type * as DEFAULT_SWATCH from './consts/default-swatch.js';

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
  theme: 'light' | 'dark';
  /** Объект с образцами цветов warning, error, success */
  system?: typeof DEFAULT_SWATCH.system;
  /**
   * Формат выгрузки токенов
   * @default 'hex/rgba'
   */
  format?: ColorFormat;
  /**
   * Колбэк для формирования кастомного списка семантических токенов
   * @param base Ссылки на базовые токены
   * @param defaults Токены по умолчанию
   * @param params Параметры переданные в getColors
   */
  overrides?: (base?: TokensBase, defaults?: DefaultTokensFull, params?: SemanticConfigOptions<T>) => Themed<T>;
}

/**
 * Получение списка семантических токенов
 *
 * @param {SemanticConfigOptions<T>} params - Конфигурация генерации
 * @returns {DefaultTokensFull | Themed<T>} Список токенов для light, dark или вместе
 */
export function getColors<T>(params: SemanticConfigOptions<T>): DefaultTokens {
  const base = getColorsBase(params);
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

  return result[params.theme];
}
