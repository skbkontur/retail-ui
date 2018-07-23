// @flow
/* eslint-disable import/no-dynamic-require, prefer-template */
function localInteropDefault<T>(obj: T): T {
    // $FlowFixMe default is a same module
    return obj && obj.__esModule ? obj.default : obj; // eslint-disable-line
}

// $FlowFixMe we use define plugin
const DatePicker = localInteropDefault(require(REACT_UI_PACKAGE + "/components/DatePicker"));
// $FlowFixMe we use define plugin
const RadioGroup = localInteropDefault(require(REACT_UI_PACKAGE + "/components/RadioGroup"));

export default class ReactUiDetection {
    static isDatePicker(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === DatePicker;
    }

    static isRadioGroup(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === RadioGroup;
    }
}
