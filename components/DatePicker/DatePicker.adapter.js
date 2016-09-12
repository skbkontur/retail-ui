// @flow

import DatePicker from './DatePicker.js';

const DatePickerAdapter = {
  getValue(inst: DatePicker) {
    return inst.props.value;
  },

  setValue(inst: DatePicker, value: ?Date) {
    const onChange: any = inst.props.onChange;
    onChange && onChange({target: {value}}, value);
  },
};

(DatePicker: any).__ADAPTER__ = DatePickerAdapter;

export default DatePicker;
