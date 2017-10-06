import Input from './Input.js';

const InputAdapter = {
  getValue(inst) {
    return inst.props.value;
  },

  setValue(inst, value) {
    inst._handleChange({ target: { value } });
  }
};

Input.__ADAPTER__ = InputAdapter;

export { InputAdapter };
export default Input;
