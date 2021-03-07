import React from 'react';

import {
  Button,
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
  Gapped,
} from '../../index';

export default { title: 'Form' };

export const Form = () => {
  const onSubmit = e => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(e.target)));
  };

  // 'Input',
  // 'FxInput',
  // 'CurrencyInput',
  // 'PasswordInput',
  // 'Autocomplete',
  // 'DateInput',
  // 'DatePicker',
  // 'ComboBox',
  // 'TokenInput',
  // 'Checkbox',
  // 'Radio',
  // 'Switcher',
  // 'Toggle',
  // // 'Select',
  // 'Button',

  const [checked, update] = React.useState(true);

  return (
    <form onSubmit={onSubmit} method="GET">
      <Gapped vertical>
        <Input name="input" value="value" type="text" />
        <FxInput name="fxinput" value="fxinput" onValueChange={console.log} />
        <CurrencyInput name="currencyinput" value={1} onValueChange={console.log} />
        <PasswordInput name="Passwordinput" value="password" onValueChange={console.log} />
        <DateInput name="Dateinput" value="00.00.00" onValueChange={console.log} />
        <DatePicker name="DatePiker" value="00.00.00" onValueChange={console.log} />
        <ComboBox name="Combobox" value={{ value: 0 }} getItems={() => Promise.resolve([])} />
        <Autocomplete
          defaultValue="Autocomplete"
          name="Autocomplete"
          source={() => Promise.resolve(['one'])}
          onValueChange={console.log}
        />
        <TokenInput
          selectedItems={['one']}
          name="TokenInput"
          getItems={() => Promise.resolve([])}
          onValueChange={console.log}
        />

        <Select name="Select" items={['one', 'two']} onValueChange={console.log} />

        <Checkbox name="Checkbox" checked={checked} onValueChange={update} />
        <Radio name="Radio" value="Radio" onValueChange={console.log} />
        <Toggle name="Toggle" onValueChange={console.log} />

        <Switcher onValueChange={console.log} name="Switcher" items={['one', '2']} />

        <Button type="submit">Submit</Button>
      </Gapped>
    </form>
  );
};
