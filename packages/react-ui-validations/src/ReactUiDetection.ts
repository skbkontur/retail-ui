import type { ReactElement } from 'react';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';

import { isNonNullable } from '../src/utils/isNonNullable';

export { Tooltip, ThemeContext };

export class ReactUiDetection {
  public static checkType(element: any, type: string) {
    return isNonNullable(element) && element.type?.__KONTUR_REACT_UI__ === type;
  }

  public static isDatePicker(element: any): boolean {
    return ReactUiDetection.checkType(element, 'DatePicker');
  }

  public static isRadioGroup(element: any): boolean {
    return ReactUiDetection.checkType(element, 'RadioGroup');
  }

  public static isTokenInput(element: any): boolean {
    return ReactUiDetection.checkType(element, 'TokenInput');
  }

  public static isSwitcher(element: any): boolean {
    return ReactUiDetection.checkType(element, 'Switcher');
  }

  public static isComboBox(element: any): boolean {
    return ReactUiDetection.checkType(element, 'ComboBox');
  }

  public static isRadio(element: any): boolean {
    return ReactUiDetection.checkType(element, 'Radio');
  }

  public static isCheckBox(element: any): boolean {
    return ReactUiDetection.checkType(element, 'Checkbox');
  }

  public static isToggle(element: any): boolean {
    return ReactUiDetection.checkType(element, 'Toggle');
  }

  public static isSelect(element: any): boolean {
    return ReactUiDetection.checkType(element, 'Select');
  }

  public static isSelectionControl(element: ReactElement): boolean {
    return (
      ReactUiDetection.isRadioGroup(element) ||
      ReactUiDetection.isRadio(element) ||
      ReactUiDetection.isCheckBox(element) ||
      ReactUiDetection.isToggle(element) ||
      ReactUiDetection.isSwitcher(element) ||
      ReactUiDetection.isSelect(element) ||
      ReactUiDetection.isComboBox(element)
    );
  }
}
