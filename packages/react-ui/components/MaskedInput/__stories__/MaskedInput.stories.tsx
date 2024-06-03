import React, { useState } from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Meta, Story } from '../../../typings/stories';
import { MaskedInput, MaskedInputProps } from '../MaskedInput';
import { Input } from '../../Input';

export default {
  title: 'Input elements/MaskedInput',
  component: MaskedInput,
} as Meta;

type InputState = Partial<MaskedInputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Mask: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={maskStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '(999) 999-99-99' }}
  />
);
Mask.parameters = {
  creevey: {
    skip: { flaky: { in: /firefox/ } },
  },
};

const maskStates: InputState[] = [
  {},
  { defaultValue: '95678901' },
  { defaultValue: '956789010A' },
  { mask: '****', value: 'overflow' },
  { placeholder: 'mask with placeholder' },
  { alwaysShowMask: true },
  { alwaysShowMask: true, maskChar: null },
  { alwaysShowMask: true, maskChar: 'X' },
  { alwaysShowMask: true, defaultValue: '95678901' },
  { alwaysShowMask: true, defaultValue: '956789010A' },
  { alwaysShowMask: true, placeholder: 'mask with placeholder' },
  { alwaysShowMask: true, type: 'email', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'tel', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'url', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'search', mask: '*** ***', defaultValue: 'Value' },
];

export const PrefixOrSuffix: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '+7 (999) 999 99 99' }}
  />
);
const inputPrefixOrSuffixStates: InputState[] = [
  {},
  { rightIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon />, value: '+79876543210' },
  { leftIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon />, value: '+79876543210' },
  { rightIcon: <SearchIcon />, placeholder: 'Placeholder' },
  { leftIcon: <SearchIcon />, placeholder: 'Placeholder' },
  { prefix: 'prefix:' },
  { prefix: 'prefix:', value: '+79876543210' },
  { suffix: '/suffix' },
  { suffix: '/suffix', value: '+79876543210' },
];

export const PrefixesAndSuffixes: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={[{}]}
    rows={prefixesAndSuffixesStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '+7 (999) 999 99 99', width: '250px' }}
  />
);
const prefixesAndSuffixesStates: InputState[] = [
  {
    rightIcon: <SearchIcon />,
    leftIcon: <SearchIcon />,
    prefix: 'prefix:',
    suffix: '/suffix',
    placeholder: 'Placeholder',
  },
  {
    rightIcon: <SearchIcon />,
    leftIcon: <SearchIcon />,
    prefix: 'prefix:',
    suffix: '/suffix',
    value: '+7987654321',
    alwaysShowMask: true,
  },
];

export const Validations: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={validationsStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '99:99' }}
  />
);

const validationsStates: InputState[] = [
  {},
  { borderless: true },
  { disabled: true },
  { alwaysShowMask: true, disabled: true },
  { warning: true },
  { error: true },
];

export const Positions: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={positionsStates.map((x) => ({ props: x }))}
    presetProps={{ alwaysShowMask: true, mask: '**** **** ****' }}
  />
);

const positionsStates: InputState[] = [
  { value: '1' },
  { value: '1111 1' },
  { value: '1111 1111 111' },
  { value: 'W' },
  { value: 'WWWW W' },
  { value: 'WWWW WWWW WWW' },
  { value: 'W1W1 W1W1 W1' },
];

export const Default: Story = () => (
  <MaskedInput width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);

export const IdleFocusBlur: Story = () => (
  <MaskedInput width="150" mask="999 999-99-99" maskChar={'_'} placeholder="Номер" />
);

export const IdleFocusBlurWithPrefix: Story = () => (
  <MaskedInput width="150" mask="+7 999 999 999" maskChar={'_'} placeholder="Номер" />
);

export const WithCustomUnmaskedValue: Story = () => {
  const [value, setValue] = useState('+795');

  return (
    <MaskedInput
      width="150"
      mask="+7 999 999-99-99"
      maskChar={'_'}
      placeholder="+7"
      alwaysShowMask
      value={value}
      onValueChange={(value) => setValue(value.replace(/\s/g, ''))}
    />
  );
};

export const SelectAllByProp: Story = () => (
  <MaskedInput mask="+7 999 999-99-99" defaultValue="+798765" selectAllOnFocus />
);

export const SelectAllByButton: Story = () => {
  let input: Input | null = null;

  const selectAll = () => {
    if (input) {
      input.selectAll();
    }
  };

  return (
    <div>
      <div>
        <MaskedInput ref={(element) => (input = element)} mask={'99:99'} defaultValue="12:34" />
      </div>
      <button data-tid="select-all" onClick={selectAll}>
        Select all
      </button>
    </div>
  );
};
SelectAllByButton.storyName = 'Select all by button';

export const UncontrolledInputWithPlaceholder: Story = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = React.useState<string>();
  return <MaskedInput mask={'aaaa aaaa'} placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
};
UncontrolledInputWithPlaceholder.storyName = 'Uncontrolled Input with Placeholder';

export const RewriteInMiddle: Story = () => <MaskedInput width="150" value={'34'} mask="9999" alwaysShowMask />;
