import * as React from 'react';
import Textarea from './Textarea.js';

const TextareaAdapter = {
  getValue(inst: Textarea) {
    return inst.props.value;
  },

  setValue(inst: Textarea, value: string) {
    // tslint:disable-next-line:no-string-literal
    inst['handleChange']({
      target: { value },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  },
};

Textarea.__ADAPTER__ = TextareaAdapter;

export { TextareaAdapter };
export default Textarea;
