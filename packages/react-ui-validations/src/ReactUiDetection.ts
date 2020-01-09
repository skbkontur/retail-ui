declare const REACT_UI_PACKAGE: string;

declare function require(name: string): any;

const DatePicker = require(REACT_UI_PACKAGE + '/components/DatePicker').DatePicker;
const RadioGroup = require(REACT_UI_PACKAGE + '/components/RadioGroup').RadioGroup;
const Tooltip = require(REACT_UI_PACKAGE + '/components/Tooltip').Tooltip;

export { Tooltip };

export class ReactUiDetection {
  public static isDatePicker(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === DatePicker;
  }

  public static isRadioGroup(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === RadioGroup;
  }
}
