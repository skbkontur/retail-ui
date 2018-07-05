import { CommonTheme } from '.';
import { getThemeColor, ThemeStyles } from '../utils';
import { getCommonTheme } from './common';

export interface MenuItemStyles {
  color?: string;
  background?: string;
}

export type MenuItemThemeState = 'default' | 'hover' | 'selected' | 'disabled';
const MENU_ITEM_STATES: MenuItemThemeState[] = ['default', 'hover', 'selected', 'disabled'];

export const getMenuItemtheme = (base: CommonTheme = getCommonTheme()): { [key: string]: any } => {
  const getColor = getThemeColor.bind(null, base.colors);
  const menuItemStyles = base.components.dropdown_menu_item;

  const stateStyles: ThemeStyles<MenuItemThemeState, MenuItemStyles> = {};

  MENU_ITEM_STATES.forEach(state => {
    stateStyles[state] = {
      color: getColor(menuItemStyles[state].text),
      background: getColor(menuItemStyles[state].background)
    };
  });

  return stateStyles;
};
