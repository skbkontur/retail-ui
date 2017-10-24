// @flow
/* global REACT_UI_PACKAGE */
/* eslint-disable import/no-dynamic-require, prefer-template */
const DatePicker = require(REACT_UI_PACKAGE + "/components/DatePicker");
const RadioGroup = require(REACT_UI_PACKAGE + "/components/RadioGroup");

export default class ReactUiDetection {
    static isDatePicker(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === DatePicker;
    }

    static isRadioGroup(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === RadioGroup;
    }
}
