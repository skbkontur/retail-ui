// @flow

import DatePicker from './DatePicker.js';

const DatePickerAdapter = {
  getValue(inst: DatePicker) {
    return inst.props.value;
  },

  setValue(inst: DatePicker, value: ?Date) {
    const {onChange} = inst.props;
    onChange && onChange({target: {value}}, value);
  },
};

DatePicker.__ADAPTER__ = DatePickerAdapter;

export default DatePicker;
