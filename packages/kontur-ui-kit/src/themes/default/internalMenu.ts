import { CommonTheme } from '.';
import { getThemeColor } from '../utils';
import { getCommonTheme } from './common';

export interface InternalMenuStyles {
  background?: string;
  'box-shadow'?: string;
}

export const getInternalMenuTheme = (
  base: CommonTheme = getCommonTheme()
): { [key: string]: any } => {
  const getColor = getThemeColor.bind(null, base.colors);

  return {
    background: getColor(base.components.dropdown_menu.background),
    'box-shadow': getColor(base.components.dropdown_menu.shadow)
  };
};
