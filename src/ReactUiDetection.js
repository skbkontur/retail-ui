// @flow
/* global REACT_UI_PACKAGE */
/* eslint-disable import/no-dynamic-require, prefer-template */
// $FlowFixMe we use define plugin
const DatePicker2 = require(REACT_UI_PACKAGE + "/components/DatePicker");
// $FlowFixMe we use define plugin
const RadioGroup2 = require(REACT_UI_PACKAGE + "/components/RadioGroup");

const DatePicker = requireDefault(DatePicker2);
const RadioGroup = requireDefault(RadioGroup2);

function requireDefault<T>(obj: T): T {
    // $FlowFixMe default is a same module
    return obj && obj.__esModule ? obj.default : obj // eslint-disable-line
}

export default class ReactUiDetection {
    static isDatePicker(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === DatePicker;
    }

    static isRadioGroup(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === RadioGroup;
    }
}
