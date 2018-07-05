import * as React from 'react';
import Textarea from './Textarea';

const TextareaAdapter = {
  getValue(inst: Textarea) {
    return inst.props.value;
  },

  setValue(inst: Textarea, value: string) {
    inst._handleChange({ target: { value } } as React.ChangeEvent<
      HTMLTextAreaElement
    >);
  }
};

Textarea.__ADAPTER__ = TextareaAdapter;

export { TextareaAdapter };
export default Textarea;
