

import RadioGroup from './RadioGroup.js';

const RadioGroupAdapter = {
  getValue(inst: RadioGroup) {
    return inst.props.value;
  },

  setValue(inst: RadioGroup, value) {
    if (inst.props.onChange) {
      // $FlowIgnore
      inst.props.onChange({ target: { value } }, value);
    }
  },

  getItemValues(inst: RadioGroup) {
    return (inst.props.items || []).map(normalizeEntry).map(([value]) => value);
  }
};
// eslint-disable-next-line flowtype/no-weak-types
(RadioGroup: any).__ADAPTER__ = RadioGroupAdapter;

export default RadioGroup;

function normalizeEntry(entry) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}
