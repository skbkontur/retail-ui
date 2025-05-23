import React from 'react';

import { isNonNullable } from '../src/utils/isNonNullable';

declare function require(name: string): any;

const defaultOrNamed = (module: any, component: string) =>
  module && module.__esModule && module.default ? module.default : module[component];

const importContext = (module: any, component: string) => module[component] || React.createContext({});

const Tooltip = defaultOrNamed(require('__REACT_UI_PACKAGE__/components/Tooltip'), 'Tooltip');
const ThemeContext = importContext(require('__REACT_UI_PACKAGE__/lib/theming/ThemeContext'), 'ThemeContext');

export { Tooltip, ThemeContext };

export class ReactUiDetection {
  public static isDatePicker(childrenArray: any): boolean {
    return isNonNullable(childrenArray) && childrenArray.type?.__KONTUR_REACT_UI__ === 'DatePicker';
  }

  public static isRadioGroup(childrenArray: any): boolean {
    return isNonNullable(childrenArray) && childrenArray.type?.__KONTUR_REACT_UI__ === 'RadioGroup';
  }

  public static isTokenInput(childrenArray: any): boolean {
    return isNonNullable(childrenArray) && childrenArray.type?.__KONTUR_REACT_UI__ === 'TokenInput';
  }

  public static isSwitcher(childrenArray: any): boolean {
    return isNonNullable(childrenArray) && childrenArray.type?.__KONTUR_REACT_UI__ === 'Switcher';
  }
  public static isComboBox(childrenArray: any): boolean {
    return isNonNullable(childrenArray) && childrenArray.type?.__KONTUR_REACT_UI__ === 'ComboBox';
  }
}
