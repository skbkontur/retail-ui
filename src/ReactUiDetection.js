// @flow
import DatePicker from "retail-ui/components/DatePicker";
import RadioGroup from "retail-ui/components/RadioGroup";

export default class ReactUiDetection {
    static isDatePicker(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === DatePicker;
    }

    static isRadioGroup(childrenArray: any): boolean {
        return childrenArray != null && childrenArray.type === RadioGroup;
    }
}
