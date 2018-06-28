
/* eslint-disable flowtype/no-weak-types */
import DatePicker from './DatePickerOld.js';

const DatePickerAdapter = {
  getValue(inst: DatePicker) {
    return inst.props.value;
  },

  setValue(inst: DatePicker, value: ?Date) {
    const onChange: any = inst.props.onChange;
    onChange && onChange({ target: { value } }, value);
  },

  getStringValue(inst: DatePicker) {
    const value = inst.props.value;
    if (typeof value === 'string') {
      return value;
    }
    return value ? value.toISOString() : null;
  },

  setStringValue(inst: DatePicker, value: ?string) {
    const onChange: any = inst.props.onChange;
    const date = value ? new Date(value) : null;
    onChange && onChange({ target: { value: date } }, date);
  }
};

(DatePicker: any).__ADAPTER__ = DatePickerAdapter;

export default DatePicker;
