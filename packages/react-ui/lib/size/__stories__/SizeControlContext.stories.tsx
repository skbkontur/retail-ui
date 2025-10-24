import React, { type ReactElement } from 'react';

import type { Meta, Story } from '../../../typings/stories';
import { Gapped } from '../../../components/Gapped';
import { Select } from '../../../components/Select';
import { SizeControlContext } from '../index';
import { ComboBox } from '../../../components/ComboBox';
import { TokenInput, TokenInputType } from '../../../components/TokenInput';
import { Autocomplete } from '../../../components/Autocomplete';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { DateInput } from '../../../components/DateInput';
import { FxInput } from '../../../components/FxInput';
import { Input } from '../../../components/Input';
import { Kebab } from '../../../components/Kebab';
import { PasswordInput } from '../../../components/PasswordInput';
import { Radio } from '../../../components/Radio';
import { Textarea } from '../../../components/Textarea';
import { Toggle } from '../../../components/Toggle';
import { Tooltip } from '../../../components/Tooltip';

export default {
  title: 'SizeControlContext',
  parameters: {
    creevey: { skip: { 'only default chrome': { in: /^(?!\b(chrome2022)\b)/ } } },
  },
} as Meta;

const ControlNames = {
  Autocomplete: 'Autocomplete',
  Button: 'Button',
  ComboBox: 'ComboBox',
  Checkbox: 'Checkbox',
  DateInput: 'DateInput',
  FxInput: 'FxInput',
  Input: 'Input',
  Kebab: 'Kebab',
  PasswordInput: 'PasswordInput',
  Radio: 'Radio',
  Select: 'Select',
  Textarea: 'Textarea',
  Toggle: 'Toggle',
  Tooltip: 'Tooltip',
  TokenInput: 'TokenInput',
};

const items = [
  { label: 'aaa', value: 1 },
  { label: 'bbb', value: 2 },
  { label: 'ccc', value: 3 },
];

function getControl(controlName: string | null): React.ReactNode {
  switch (controlName) {
    case ControlNames.ComboBox:
      return <ComboBox getItems={(str) => Promise.resolve(items.filter(({ label }) => label.includes(str))).then()} />;

    case ControlNames.TokenInput:
      return <TokenInput type={TokenInputType.Combined} getItems={() => Promise.resolve([]).then()} />;

    case ControlNames.Autocomplete:
      return <Autocomplete value={''} onValueChange={() => {}} />;

    case ControlNames.Button:
      return <Button>Я кнопка</Button>;

    case ControlNames.Checkbox:
      return <Checkbox />;

    case ControlNames.DateInput:
      return <DateInput value="30.12.2012" />;

    case ControlNames.Select:
      return <Select />;

    case ControlNames.FxInput:
      return <FxInput onValueChange={() => {}} />;

    case ControlNames.Input:
      return <Input />;

    case ControlNames.Kebab:
      return <Kebab />;

    case ControlNames.PasswordInput:
      return <PasswordInput />;

    case ControlNames.Radio:
      return <Radio value={''} />;

    case ControlNames.Textarea:
      return <Textarea />;

    case ControlNames.Toggle:
      return <Toggle />;
    case ControlNames.Tooltip:
      return (
        <Tooltip trigger="opened" render={() => 'Lorem Ipsum'} pos={'right'} closeButton={false}>
          Tooltip small
        </Tooltip>
      );
  }

  return null;
}

export const Small: Story = () => {
  return (
    <SizeControlContext.Provider value={{ size: 'small' }}>
      <Gapped gap={24} vertical>
        {Object.values(ControlNames).map((controlName) => getControl(controlName))}
      </Gapped>
    </SizeControlContext.Provider>
  );
};

export const Medium: Story = () => {
  return (
    <SizeControlContext.Provider value={{ size: 'medium' }}>
      <Gapped gap={24} vertical>
        {Object.values(ControlNames).map((controlName) => getControl(controlName))}
      </Gapped>
    </SizeControlContext.Provider>
  );
};

export const Large = (): ReactElement => {
  return (
    <SizeControlContext.Provider value={{ size: 'large' }}>
      <Gapped gap={16} vertical>
        {Object.values(ControlNames).map((controlName) => getControl(controlName))}
      </Gapped>
    </SizeControlContext.Provider>
  );
};
