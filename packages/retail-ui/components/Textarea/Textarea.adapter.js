

import Textarea from './Textarea.js';

const TextareaAdapter = {
  getValue(inst: Textarea) {
    return inst.props.value;
  },

  setValue(inst: Textarea, value: string) {
    inst._handleChange({ target: { value } });
  }
};
// eslint-disable-next-line flowtype/no-weak-types
(Textarea: any).__ADAPTER__ = TextareaAdapter;

export { TextareaAdapter };
export default Textarea;
