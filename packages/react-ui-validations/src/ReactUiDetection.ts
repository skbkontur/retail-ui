declare const REACT_UI_PACKAGE: string;

declare function require(name: string): any;

const defaultOrNamed = (module: any, component: string) =>
  module && module.__esModule && module.default ? module.default : module[component];

const DatePicker = defaultOrNamed(require(REACT_UI_PACKAGE + '/components/DatePicker'), 'DatePicker');
const RadioGroup = defaultOrNamed(require(REACT_UI_PACKAGE + '/components/RadioGroup'), 'RadioGroup');
const TokenInput = defaultOrNamed(require(REACT_UI_PACKAGE + '/components/TokenInput'), 'TokenInput');
const Tooltip = defaultOrNamed(require(REACT_UI_PACKAGE + '/components/Tooltip'), 'Tooltip');

export { Tooltip };

export class ReactUiDetection {
  public static isDatePicker(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === DatePicker;
  }

  public static isRadioGroup(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === RadioGroup;
  }

  public static isTokenInput(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === TokenInput;
  }
}
