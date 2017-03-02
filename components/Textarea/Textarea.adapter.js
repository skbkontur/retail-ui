// @flow

import Textarea from './Textarea.js';

const TextareaAdapter = {
  getValue(inst: Textarea) {
    return inst.props.value;
  },

  setValue(inst: Textarea, value: string) {
    inst.handleChange({ target: { value } });
  }
};

(Textarea: any).__ADAPTER__ = TextareaAdapter;

export { TextareaAdapter };
export default Textarea;
