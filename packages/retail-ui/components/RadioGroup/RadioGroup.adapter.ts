import RadioGroup from './RadioGroup.js';
import { SyntheticRadioEvent } from '../Radio';

const RadioGroupAdapter = {
  getValue(inst: RadioGroup<any>) {
    return inst.props.value;
  },

  setValue(inst: RadioGroup<any>, value: any) {
    if (inst.props.onChange) {
      inst.props.onChange({ target: { value } } as SyntheticRadioEvent<any>, value);
    }
  },

  getItemValues(inst: RadioGroup<any>) {
    return (inst.props.items || []).map(normalizeEntry).map(([value]) => value);
  },
};

(RadioGroup as any).__ADAPTER__ = RadioGroupAdapter;

export default RadioGroup;

function normalizeEntry(entry: any) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}
