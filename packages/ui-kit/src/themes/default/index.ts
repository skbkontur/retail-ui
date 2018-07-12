import { deepMerge } from '../../lib/deepMerge';
import { DeepPartial } from '../../lib/types';
import { getButtonTheme } from './button';
import { getCheckboxTheme } from './checkbox';
import { getCommonTheme } from './common';
import { getInputTheme } from './input';
import { getInternalMenuTheme } from './internalMenu';
import { getLinkTheme } from './link';
import { getMenuItemtheme } from './menuItem';
import { getTextTheme } from './text';

export function getDefaultTheme(common?: DeepPartial<CommonTheme>) {
  const base = common ? deepMerge(getCommonTheme(), common) : getCommonTheme();

  return {
    common: base,
    button: getButtonTheme(base),
    link: getLinkTheme(base),
    text: getTextTheme(base),
    checkbox: getCheckboxTheme(base),
    input: getInputTheme(base),
    internalMenu: getInternalMenuTheme(base),
    menuItem: getMenuItemtheme(base)
  };
}

export function mergeWithDefaultTheme({
  common,
  ...rest
}: Partial<DefaultThemeType>): DefaultThemeType {
  return deepMerge(getDefaultTheme(common), rest);
}

export type CommonTheme = ReturnType<typeof getCommonTheme>;
export type DefaultThemeType = ReturnType<typeof getDefaultTheme>;
