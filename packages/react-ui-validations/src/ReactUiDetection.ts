import { Tooltip } from '@skbkontur/react-ui/components/Tooltip/Tooltip';
import { getRootNode } from '@skbkontur/react-ui/lib/rootNode/getRootNode';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import type { ReactElement } from 'react';

import { isNonNullable } from '../src/utils/isNonNullable/isNonNullable.js';

export { Tooltip, ThemeContext, getRootNode };
interface KonturUIElementForDetection {
  type: { __KONTUR_REACT_UI__: string };
}
export class ReactUiDetection {
  public static checkType(element: unknown, type: string): element is KonturUIElementForDetection {
    const el = element as KonturUIElementForDetection;
    return isNonNullable(element) && el.type?.__KONTUR_REACT_UI__ === type;
  }

  public static isDatePicker(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'DatePicker');
  }

  public static isRadioGroup(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'RadioGroup');
  }

  public static isTokenInput(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'TokenInput');
  }

  public static isSwitcher(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'Switcher');
  }

  public static isComboBox(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'ComboBox');
  }

  public static isRadio(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'Radio');
  }

  public static isCheckBox(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'Checkbox');
  }

  public static isToggle(element: unknown): boolean {
    return ReactUiDetection.checkType(element, 'Toggle');
  }

  public static isSelect(element: unknown): boolean {
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
