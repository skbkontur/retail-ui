import React from 'react';
import { mount } from 'enzyme';

import {
  Input,
  ComboBox,
  Checkbox,
  Select,
  Switcher,
  FxInput,
  CurrencyInput,
  PasswordInput,
  Autocomplete,
  DateInput,
  DatePicker,
  TokenInput,
  Radio,
  Toggle,
} from '../../index';

const getFormData = (form: HTMLFormElement) => {
  // @ts-ignore
  return Object.fromEntries(new FormData(form));
};

// checks basic ability of components to work inside forms/FormData API
// by providing names and values to native inputs
describe('FormData API', () => {
  it('works for all form components', () => {
    const values = {
      Input: 'value',
      FxInput: 'value',
      CurrencyInput: '0,00',
      PasswordInput: 'value',
      DateInput: '00.00.0000',
      DatePicker: '00.00.0000',
      ComboBox: '0',
      Autocomplete: 'value',
      TokenInput: 'one,two',
      Select: 'one',
      Checkbox: 'value',
      Radio: 'value',
      Toggle: 'value',
      Switcher: 'value',
    };

    const form = mount(
      <form>
        <Input value={values['Input']} name="Input" />
        <FxInput value={values['FxInput']} name="FxInput" onValueChange={jest.fn()} />
        <CurrencyInput value={0} name="CurrencyInput" onValueChange={jest.fn()} />
        <PasswordInput value={values['PasswordInput']} name="PasswordInput" />
        <DateInput value={values['DateInput']} name="DateInput" />
        <DatePicker value={values['DatePicker']} name="DatePicker" onValueChange={jest.fn()} />
        <ComboBox value={{ value: 0 }} name="ComboBox" getItems={() => Promise.resolve([])} />
        <Autocomplete
          value={values['Autocomplete']}
          name="Autocomplete"
          source={() => Promise.resolve([])}
          onValueChange={jest.fn()}
        />
        <TokenInput selectedItems={['one', 'two']} name="TokenInput" getItems={() => Promise.resolve([])} />

        <Select value={values['Select']} name="Select" items={['one']} />

        <Checkbox value={values['Checkbox']} name="Checkbox" checked />
        <Radio value={values['Radio']} name="Radio" checked />
        <Toggle value={values['Toggle']} name="Toggle" checked />

        <Switcher value={values['Switcher']} name="Switcher" items={['value']} />
      </form>,
    );

    expect(getFormData(form.getDOMNode())).toMatchObject(values);
  });
});
