import Select from './Select.js';

const SelectAdapter = {
  getValue(inst: Select) {
    // tslint:disable-next-line:no-string-literal
    return inst['_getValue']();
  },

  setValue(inst: Select, value: any) {
    if (inst.props.onChange) {
      inst.props.onChange({ target: { value } }, value);
    }
  },

  getItemValues(inst: Select) {
    // tslint:disable-next-line:no-string-literal
    inst['_open']();
    // tslint:disable-next-line:no-string-literal
    inst['_close']();
    // tslint:disable-next-line:no-string-literal
    return inst['_mapItems'](value => value);
  }
};

(Select as any).__ADAPTER__ = SelectAdapter;

export default Select;
