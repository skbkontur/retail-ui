declare const REACT_UI_PACKAGE: string;

declare function require(name: string): any;

function localInteropDefault(obj: any): any {
  return obj && obj.__esModule ? obj.default : obj;
}

// todo think about DatePicker & DatePickerOld
const DatePicker = localInteropDefault(require(REACT_UI_PACKAGE + '/components/DatePicker'));
const RadioGroup = localInteropDefault(require(REACT_UI_PACKAGE + '/components/RadioGroup'));
const Tooltip = localInteropDefault(require(REACT_UI_PACKAGE + '/components/Tooltip'));

export { Tooltip };

export default class ReactUiDetection {
  public static isDatePicker(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === DatePicker;
  }

  public static isRadioGroup(childrenArray: any): boolean {
    return childrenArray != null && childrenArray.type === RadioGroup;
  }
}
